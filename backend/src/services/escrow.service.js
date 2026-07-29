// src/services/escrow.service.js
'use strict';

const prisma = require('../config/prisma');
const escrowRepository = require('../repositories/escrow.repository');
const walletService = require('./wallet.service');
const outboxService = require('./outbox.service');
const { createEscrowSchema, updateEscrowSchema } = require('../validators/escrow.validator');
const AppError = require('../utils/AppError');
const logger = require('../config/logger');

// Default platform fee — move to config/DB-driven pricing later.
const PLATFORM_FEE_PERCENT = Number(process.env.PLATFORM_FEE_PERCENT || 2.5);

// ─────────────────────────────────────────────────────────────────
// STATE MACHINE
// Keys = current status, values = statuses it may legally move to.
// Every mutating method below MUST check this map before writing.
// ─────────────────────────────────────────────────────────────────
const TRANSITIONS = {
  DRAFT: ['PENDING_ACCEPTANCE', 'CANCELLED'],
  PENDING_ACCEPTANCE: ['FUNDED', 'CANCELLED'],
  FUNDED: ['IN_PROGRESS', 'DELIVERED', 'DISPUTED', 'EXPIRED'],
  IN_PROGRESS: ['DELIVERED', 'DISPUTED'],
  DELIVERED: ['COMPLETED', 'DISPUTED'],
  DISPUTED: ['RESOLVED'],
  RESOLVED: ['COMPLETED', 'REFUNDED'],
  COMPLETED: [],
  CANCELLED: [],
  REFUNDED: [],
  EXPIRED: ['REFUNDED'],
};

function assertTransition(from, to) {
  if (!TRANSITIONS[from]?.includes(to)) {
    throw AppError.conflict(
      `Cannot move escrow from ${from} to ${to}`,
      'ESCROW_INVALID_TRANSITION'
    );
  }
}

function assertParty(escrow, userId, allowed = ['buyer', 'seller']) {
  const isBuyer = escrow.buyerId === userId;
  const isSeller = escrow.sellerId === userId;
  if ((allowed.includes('buyer') && isBuyer) || (allowed.includes('seller') && isSeller)) return;
  throw AppError.forbidden('You are not a party to this escrow', 'ESCROW_NOT_A_PARTY');
}

class EscrowService {
  // ──────────────────────────────
  // CREATE  (buyer initiates)
  // ──────────────────────────────
  async createEscrow(buyerId, data) {
    const { error, value } = createEscrowSchema.validate(data);
    if (error) throw AppError.badRequest(error.details[0].message);

    if (value.sellerId === buyerId) {
      throw AppError.badRequest('Buyer and seller cannot be the same user', 'ESCROW_SELF_DEAL');
    }

    const seller = await prisma.user.findUnique({ where: { id: value.sellerId } });
    if (!seller) throw AppError.notFound('Seller not found');

    const feeAmount = Number((value.amount * (PLATFORM_FEE_PERCENT / 100)).toFixed(2));

    const escrow = await escrowRepository.create({
      buyerId,
      sellerId: value.sellerId,
      title: value.title,
      description: value.description,
      amount: value.amount,
      feeAmount,
      currency: value.currency,
      deliveryAddress: value.deliveryAddress,
      expiresAt: value.expiresAt,
      status: 'PENDING_ACCEPTANCE',
    });

    logger.info('escrow.created', { escrowId: escrow.id, buyerId, sellerId: value.sellerId });
    return escrow;
  }

  async getEscrowById(id, requestingUserId) {
    const escrow = await escrowRepository.findById(id);
    if (!escrow) throw AppError.notFound('Escrow not found');
    assertParty(escrow, requestingUserId);
    return escrow;
  }

  async listForUser(userId, query) {
    return escrowRepository.findForUser(userId, query);
  }

  async updateEscrow(id, userId, data) {
    const { error, value } = updateEscrowSchema.validate(data);
    if (error) throw AppError.badRequest(error.details[0].message);

    const escrow = await escrowRepository.findById(id);
    if (!escrow) throw AppError.notFound('Escrow not found');
    assertParty(escrow, userId, ['buyer']);

    if (!['DRAFT', 'PENDING_ACCEPTANCE'].includes(escrow.status)) {
      throw AppError.conflict('Escrow terms can only be edited before funding', 'ESCROW_LOCKED');
    }

    return escrowRepository.update(id, value);
  }

  // ──────────────────────────────
  // SELLER ACCEPTS TERMS
  // (does not move money — buyer must still call fundEscrow)
  // ──────────────────────────────
  async acceptTerms(id, sellerId, accept) {
    const escrow = await escrowRepository.findById(id);
    if (!escrow) throw AppError.notFound('Escrow not found');
    assertParty(escrow, sellerId, ['seller']);

    if (escrow.status !== 'PENDING_ACCEPTANCE') {
      throw AppError.conflict('Escrow is not awaiting acceptance', 'ESCROW_INVALID_TRANSITION');
    }

    if (!accept) {
      return escrowRepository.update(id, { status: 'CANCELLED', cancelledAt: new Date() });
    }

    return escrowRepository.update(id, { sellerAcceptedAt: new Date() });
  }

  // ──────────────────────────────
  // FUND  (buyer moves money buyer-wallet -> escrow hold)
  // This is the critical money-movement path: wallet debit,
  // transaction record, escrow status change and outbox event all
  // happen atomically or not at all.
  // ──────────────────────────────
  async fundEscrow(id, buyerId) {
    return prisma.$transaction(async (tx) => {
      const escrow = await escrowRepository.findByIdTx(tx, id);
      if (!escrow) throw AppError.notFound('Escrow not found');
      assertParty(escrow, buyerId, ['buyer']);

      if (!escrow.sellerAcceptedAt) {
        throw AppError.conflict('Seller has not accepted the terms yet', 'ESCROW_NOT_ACCEPTED');
      }
      assertTransition(escrow.status, 'FUNDED');

      const wallet = await walletService.getOrCreateWallet(tx, buyerId, escrow.currency);

      const transaction = await tx.transaction.create({
        data: {
          userId: buyerId,
          escrowId: escrow.id,
          walletId: wallet.id,
          type: 'ESCROW_FUND',
          status: 'PENDING',
          amount: escrow.amount,
          currency: escrow.currency,
          description: `Fund escrow: ${escrow.title}`,
        },
      });

      await walletService.holdForEscrow(tx, {
        walletId: wallet.id,
        transactionId: transaction.id,
        amount: escrow.amount,
      });

      const completedTx = await tx.transaction.update({
        where: { id: transaction.id },
        data: { status: 'SUCCESS' },
      });

      const updatedEscrow = await escrowRepository.updateTx(tx, id, {
        status: 'FUNDED',
        fundedAt: new Date(),
      });

      await outboxService.recordEvent(tx, {
        aggregateType: 'Escrow',
        aggregateId: escrow.id,
        eventType: 'escrow.funded',
        payload: { escrowId: escrow.id, buyerId, sellerId: escrow.sellerId, amount: escrow.amount, currency: escrow.currency },
      });

      logger.info('escrow.funded', { escrowId: escrow.id, transactionId: completedTx.id });
      return updatedEscrow;
    });
  }

  // ──────────────────────────────
  // SELLER MARKS WORK STARTED  (optional, cosmetic transition)
  // ──────────────────────────────
  async startProgress(id, sellerId) {
    const escrow = await escrowRepository.findById(id);
    if (!escrow) throw AppError.notFound('Escrow not found');
    assertParty(escrow, sellerId, ['seller']);
    assertTransition(escrow.status, 'IN_PROGRESS');
    return escrowRepository.update(id, { status: 'IN_PROGRESS' });
  }

  // ──────────────────────────────
  // SELLER MARKS DELIVERED
  // ──────────────────────────────
  async markDelivered(id, sellerId) {
    const escrow = await escrowRepository.findById(id);
    if (!escrow) throw AppError.notFound('Escrow not found');
    assertParty(escrow, sellerId, ['seller']);
    assertTransition(escrow.status, 'DELIVERED');
    return escrowRepository.update(id, { status: 'DELIVERED', deliveredAt: new Date() });
  }

  // ──────────────────────────────
  // BUYER CONFIRMS -> RELEASE FUNDS TO SELLER
  // ──────────────────────────────
  async confirmAndRelease(id, buyerId) {
    return prisma.$transaction(async (tx) => {
      const escrow = await escrowRepository.findByIdTx(tx, id);
      if (!escrow) throw AppError.notFound('Escrow not found');
      assertParty(escrow, buyerId, ['buyer']);
      assertTransition(escrow.status, 'COMPLETED');

      const buyerWallet = await walletService.getOrCreateWallet(tx, escrow.buyerId, escrow.currency);
      const sellerWallet = await walletService.getOrCreateWallet(tx, escrow.sellerId, escrow.currency);

      // Release the hold on the buyer's wallet (removes escrowBalance).
      await walletService.releaseHold(tx, { walletId: buyerWallet.id, amount: escrow.amount });

      const netAmount = Number(escrow.amount) - Number(escrow.feeAmount);

      const releaseTx = await tx.transaction.create({
        data: {
          userId: escrow.sellerId,
          escrowId: escrow.id,
          walletId: sellerWallet.id,
          type: 'ESCROW_RELEASE',
          status: 'PENDING',
          amount: netAmount,
          currency: escrow.currency,
          description: `Escrow release: ${escrow.title}`,
        },
      });

      await walletService.credit(tx, {
        walletId: sellerWallet.id,
        transactionId: releaseTx.id,
        amount: netAmount,
      });

      await tx.transaction.update({ where: { id: releaseTx.id }, data: { status: 'SUCCESS' } });

      if (Number(escrow.feeAmount) > 0) {
        await tx.transaction.create({
          data: {
            userId: escrow.sellerId,
            escrowId: escrow.id,
            walletId: sellerWallet.id,
            type: 'FEE',
            status: 'SUCCESS',
            amount: escrow.feeAmount,
            currency: escrow.currency,
            description: 'Platform fee',
          },
        });
      }

      const updatedEscrow = await escrowRepository.updateTx(tx, id, {
        status: 'COMPLETED',
        completedAt: new Date(),
      });

      await outboxService.recordEvent(tx, {
        aggregateType: 'Escrow',
        aggregateId: escrow.id,
        eventType: 'escrow.completed',
        payload: { escrowId: escrow.id, sellerId: escrow.sellerId, amount: netAmount, currency: escrow.currency },
      });

      logger.info('escrow.completed', { escrowId: escrow.id, releaseTxId: releaseTx.id });
      return updatedEscrow;
    });
  }

  // ──────────────────────────────
  // CANCEL  (before funding — no money to move)
  // ──────────────────────────────
  async cancelEscrow(id, userId) {
    const escrow = await escrowRepository.findById(id);
    if (!escrow) throw AppError.notFound('Escrow not found');
    assertParty(escrow, userId);
    assertTransition(escrow.status, 'CANCELLED');
    return escrowRepository.update(id, { status: 'CANCELLED', cancelledAt: new Date() });
  }

  // ──────────────────────────────
  // REFUND  (after RESOLVED or EXPIRED — hold goes back to buyer)
  // ──────────────────────────────
  async refundEscrow(id, actorId) {
    return prisma.$transaction(async (tx) => {
      const escrow = await escrowRepository.findByIdTx(tx, id);
      if (!escrow) throw AppError.notFound('Escrow not found');
      assertTransition(escrow.status, 'REFUNDED');

      const buyerWallet = await walletService.getOrCreateWallet(tx, escrow.buyerId, escrow.currency);

      await walletService.releaseHold(tx, { walletId: buyerWallet.id, amount: escrow.amount });

      const refundTx = await tx.transaction.create({
        data: {
          userId: escrow.buyerId,
          escrowId: escrow.id,
          walletId: buyerWallet.id,
          type: 'ESCROW_REFUND',
          status: 'PENDING',
          amount: escrow.amount,
          currency: escrow.currency,
          description: `Escrow refund: ${escrow.title}`,
        },
      });

      await walletService.credit(tx, {
        walletId: buyerWallet.id,
        transactionId: refundTx.id,
        amount: escrow.amount,
      });

      await tx.transaction.update({ where: { id: refundTx.id }, data: { status: 'SUCCESS' } });

      const updatedEscrow = await escrowRepository.updateTx(tx, id, { status: 'REFUNDED' });

      await outboxService.recordEvent(tx, {
        aggregateType: 'Escrow',
        aggregateId: escrow.id,
        eventType: 'escrow.refunded',
        payload: { escrowId: escrow.id, buyerId: escrow.buyerId, amount: escrow.amount, currency: escrow.currency },
      });

      logger.info('escrow.refunded', { escrowId: escrow.id, actorId, refundTxId: refundTx.id });
      return updatedEscrow;
    });
  }
}

module.exports = new EscrowService();
