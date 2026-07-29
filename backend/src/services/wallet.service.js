// src/services/wallet.service.js
'use strict';

const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');
const logger = require('../config/logger');

// ─────────────────────────────────────────────────────────────────
// WHY THIS FILE EXISTS
//
// Wallet.balance / Wallet.escrowBalance must never be written to
// directly from a controller or another service. Every change goes
// through here, and every change:
//   1. happens inside the caller's prisma.$transaction (tx passed in)
//   2. writes an append-only LedgerEntry row (the audit trail)
//   3. updates the cached Wallet total from that same tx
//
// This keeps "how much money does this user have" always reconcilable
// against the ledger, and makes concurrent updates safe because MySQL
// row locks the Wallet row for the duration of the transaction.
// ─────────────────────────────────────────────────────────────────

/**
 * Get or create a user's wallet for a currency. Must be called with
 * an active transaction client so the SELECT participates in locking.
 */
async function getOrCreateWallet(tx, userId, currency) {
  let wallet = await tx.wallet.findUnique({
    where: { userId_currency: { userId, currency } },
  });

  if (!wallet) {
    wallet = await tx.wallet.create({
      data: { userId, currency, balance: 0, escrowBalance: 0 },
    });
  }
  return wallet;
}

/**
 * Lock a wallet row for update (prevents lost updates under
 * concurrent transactions on the same wallet, e.g. two simultaneous
 * withdrawals). MySQL: SELECT ... FOR UPDATE.
 */
async function lockWallet(tx, walletId) {
  const rows = await tx.$queryRaw`
    SELECT * FROM wallets WHERE id = ${walletId} FOR UPDATE
  `;
  if (!rows || rows.length === 0) {
    throw AppError.notFound('Wallet not found', 'WALLET_NOT_FOUND');
  }
  return rows[0];
}

/**
 * Credit a wallet's available balance and write the matching ledger
 * entry. Use for: deposits, escrow releases (seller), escrow refunds
 * (buyer).
 */
async function credit(tx, { walletId, transactionId, amount }) {
  await lockWallet(tx, walletId);

  const wallet = await tx.wallet.update({
    where: { id: walletId },
    data: { balance: { increment: amount } },
  });

  await tx.ledgerEntry.create({
    data: {
      walletId,
      transactionId,
      direction: 'CREDIT',
      amount,
      balanceAfter: wallet.balance,
    },
  });

  return wallet;
}

/**
 * Debit a wallet's available balance. Throws if insufficient funds.
 * Use for: withdrawals, moving funds into an escrow hold.
 */
async function debit(tx, { walletId, transactionId, amount }) {
  const locked = await lockWallet(tx, walletId);

  if (Number(locked.balance) < Number(amount)) {
    throw AppError.badRequest('Insufficient wallet balance', 'INSUFFICIENT_FUNDS');
  }

  const wallet = await tx.wallet.update({
    where: { id: walletId },
    data: { balance: { decrement: amount } },
  });

  await tx.ledgerEntry.create({
    data: {
      walletId,
      transactionId,
      direction: 'DEBIT',
      amount,
      balanceAfter: wallet.balance,
    },
  });

  return wallet;
}

/**
 * Move funds from available balance into the escrow hold on the
 * SAME wallet (buyer funding an escrow). This is a debit on
 * `balance` and an increment on `escrowBalance` — no money actually
 * leaves the wallet yet, it's just earmarked.
 */
async function holdForEscrow(tx, { walletId, transactionId, amount }) {
  const locked = await lockWallet(tx, walletId);

  if (Number(locked.balance) < Number(amount)) {
    throw AppError.badRequest('Insufficient wallet balance to fund escrow', 'INSUFFICIENT_FUNDS');
  }

  const wallet = await tx.wallet.update({
    where: { id: walletId },
    data: {
      balance: { decrement: amount },
      escrowBalance: { increment: amount },
    },
  });

  await tx.ledgerEntry.create({
    data: {
      walletId,
      transactionId,
      direction: 'DEBIT',
      amount,
      balanceAfter: wallet.balance,
    },
  });

  return wallet;
}

/**
 * Release funds held for an escrow out of escrowBalance. Caller
 * decides where the money goes next (credit seller's wallet, or
 * credit buyer's wallet for a refund) — this only removes the hold.
 */
async function releaseHold(tx, { walletId, amount }) {
  const locked = await lockWallet(tx, walletId);

  if (Number(locked.escrowBalance) < Number(amount)) {
    throw AppError.badRequest('Escrow hold amount exceeds held balance', 'INVALID_ESCROW_HOLD');
  }

  return tx.wallet.update({
    where: { id: walletId },
    data: { escrowBalance: { decrement: amount } },
  });
}

module.exports = {
  getOrCreateWallet,
  lockWallet,
  credit,
  debit,
  holdForEscrow,
  releaseHold,
};
