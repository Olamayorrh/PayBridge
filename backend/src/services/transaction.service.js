// src/services/transaction.service.js
'use strict';

const prisma = require('../config/prisma');
const transactionRepository = require('../repositories/transaction.repository');
const walletService = require('./wallet.service');
const outboxService = require('./outbox.service');
const auditLogService = require('./auditLog.service');
const { listTransactionsSchema, adminAdjustmentSchema, withdrawalSchema } = require('../validators/transaction.validator');
const AppError = require('../utils/AppError');
const logger = require('../config/logger');

class TransactionService {
  async getById(id, requestingUser) {
    const transaction = await transactionRepository.findById(id);
    if (!transaction) throw AppError.notFound('Transaction not found');

    const isOwner = transaction.userId === requestingUser.id;
    const isAdmin = requestingUser.role === 'ADMIN';
    if (!isOwner && !isAdmin) throw AppError.forbidden('Not your transaction');

    return transaction;
  }

  async listForUser(userId, query) {
    const { error, value } = listTransactionsSchema.validate(query);
    if (error) throw AppError.badRequest(error.details[0].message);
    return transactionRepository.findForUser(userId, value);
  }

  // ──────────────────────────────
  // WITHDRAWAL REQUEST
  // Debits the wallet immediately (funds are no longer "available"
  // the moment the request is made) and leaves the transaction
  // PENDING. The actual bank payout is completed by the Payment
  // module (next stage) calling markWithdrawalSettled/Failed below.
  // ──────────────────────────────
  async requestWithdrawal(userId, data) {
    const { error, value } = withdrawalSchema.validate(data);
    if (error) throw AppError.badRequest(error.details[0].message);

    return prisma.$transaction(async (tx) => {
      const wallet = await walletService.getOrCreateWallet(tx, userId, value.currency);

      const transaction = await tx.transaction.create({
        data: {
          userId,
          walletId: wallet.id,
          type: 'WITHDRAWAL',
          status: 'PENDING',
          amount: value.amount,
          currency: value.currency,
          bankName: value.bankName,
          description: `Withdrawal to ${value.bankName} ****${value.accountNumber.slice(-4)}`,
        },
      });

      await walletService.debit(tx, {
        walletId: wallet.id,
        transactionId: transaction.id,
        amount: value.amount,
      });

      await outboxService.recordEvent(tx, {
        aggregateType: 'Transaction',
        aggregateId: transaction.id,
        eventType: 'transaction.withdrawal.requested',
        payload: { transactionId: transaction.id, userId, amount: value.amount, currency: value.currency, bankName: value.bankName },
      });

      logger.info('transaction.withdrawal.requested', { transactionId: transaction.id, userId });
      return transaction;
    });
  }

  // Called by the payout worker once the bank transfer provider
  // confirms success or failure (stage 4: Payment).
  async markWithdrawalSettled(transactionId, providerRef) {
    return prisma.transaction.update({
      where: { id: transactionId },
      data: { status: 'SUCCESS' },
    });
  }

  async markWithdrawalFailed(transactionId, reason) {
    // Reverse the debit: credit the wallet back and mark REVERSED.
    return prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUnique({ where: { id: transactionId } });
      if (!transaction) throw AppError.notFound('Transaction not found');

      await walletService.credit(tx, {
        walletId: transaction.walletId,
        transactionId: transaction.id,
        amount: transaction.amount,
      });

      return tx.transaction.update({
        where: { id: transactionId },
        data: { status: 'REVERSED', description: `${transaction.description} — FAILED: ${reason}` },
      });
    });
  }

  // ──────────────────────────────
  // ADMIN MANUAL ADJUSTMENT
  // Always audited. Use for support-driven corrections only.
  // ──────────────────────────────
  async adminAdjust(adminId, data) {
    const { error, value } = adminAdjustmentSchema.validate(data);
    if (error) throw AppError.badRequest(error.details[0].message);

    return prisma.$transaction(async (tx) => {
      const wallet = await walletService.getOrCreateWallet(tx, value.userId, value.currency);
      const before = { balance: wallet.balance };

      const transaction = await tx.transaction.create({
        data: {
          userId: value.userId,
          walletId: wallet.id,
          type: 'ADJUSTMENT',
          status: 'SUCCESS',
          amount: value.amount,
          currency: value.currency,
          description: `Admin ${value.direction.toLowerCase()}: ${value.reason}`,
        },
      });

      const updatedWallet = value.direction === 'CREDIT'
        ? await walletService.credit(tx, { walletId: wallet.id, transactionId: transaction.id, amount: value.amount })
        : await walletService.debit(tx, { walletId: wallet.id, transactionId: transaction.id, amount: value.amount });

      await auditLogService.record(tx, {
        actorId: adminId,
        action: 'WALLET_MANUAL_ADJUSTMENT',
        entityType: 'Wallet',
        entityId: wallet.id,
        before,
        after: { balance: updatedWallet.balance },
      });

      await outboxService.recordEvent(tx, {
        aggregateType: 'Transaction',
        aggregateId: transaction.id,
        eventType: 'transaction.admin_adjustment',
        payload: { transactionId: transaction.id, userId: value.userId, amount: value.amount, direction: value.direction },
      });

      logger.warn('transaction.admin_adjustment', { adminId, userId: value.userId, amount: value.amount, direction: value.direction });
      return transaction;
    });
  }
}

module.exports = new TransactionService();

//explain what this file is doing
/* This file defines a `TransactionService` class that handles various transaction-related operations in a backend application. It interacts with the database through the Prisma ORM and uses repositories and other services to manage transactions, wallets, and audit logs.
The main functionalities provided by this service include:
 1. Retrieving a transaction by ID and ensuring the requesting user has permission to view it.
 2. Listing transactions for a specific user with optional query parameters for filtering.
 3. Handling withdrawal requests, which involves debiting the user's wallet and creating a pending transaction.
 4. Marking withdrawals as settled or failed, with appropriate wallet adjustments in case of failure.
 5. Allowing administrators to perform manual adjustments to user wallets, which are always audited for accountability.

 The service uses validation schemas to ensure that incoming data is valid and throws appropriate errors when necessary. It also logs important events for monitoring and debugging purposes.*/