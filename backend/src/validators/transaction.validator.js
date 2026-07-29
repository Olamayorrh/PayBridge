// src/validators/transaction.validator.js
'use strict';

const Joi = require('joi');

const listTransactionsSchema = Joi.object({
  type: Joi.string().valid(
    'DEPOSIT', 'ESCROW_FUND', 'ESCROW_RELEASE', 'ESCROW_REFUND', 'WITHDRAWAL', 'FEE', 'ADJUSTMENT'
  ),
  status: Joi.string().valid('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'REVERSED'),
  escrowId: Joi.string().uuid(),
  from: Joi.date().iso(),
  to: Joi.date().iso().min(Joi.ref('from')),
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
});

const adminAdjustmentSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  currency: Joi.string().pattern(/^[A-Z]{3}$/).required(),
  amount: Joi.number().positive().precision(2).required(),
  direction: Joi.string().valid('CREDIT', 'DEBIT').required(),
  reason: Joi.string().min(5).max(1000).required(),
});

const withdrawalSchema = Joi.object({
  currency: Joi.string().pattern(/^[A-Z]{3}$/).required(),
  amount: Joi.number().positive().precision(2).required(),
  bankName: Joi.string().min(2).max(150).required(),
  accountNumber: Joi.string().min(4).max(34).required(),
});

module.exports = { listTransactionsSchema, adminAdjustmentSchema, withdrawalSchema };
