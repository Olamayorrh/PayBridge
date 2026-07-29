// src/validators/escrow.validator.js
'use strict';

const Joi = require('joi');

const currencyRegex = /^[A-Z]{3}$/; // ISO 4217, e.g. NGN, USD

const createEscrowSchema = Joi.object({
  sellerId: Joi.string().uuid().required(),
  title: Joi.string().min(3).max(150).required(),
  description: Joi.string().max(5000).allow('', null),
  amount: Joi.number().positive().precision(2).required(),
  currency: Joi.string().pattern(currencyRegex).required().messages({
    'string.pattern.base': 'currency must be a 3-letter ISO code, e.g. NGN',
  }),
  deliveryAddress: Joi.string().max(2000).allow('', null),
  expiresAt: Joi.date().iso().greater('now').optional(),
});

const updateEscrowSchema = Joi.object({
  title: Joi.string().min(3).max(150),
  description: Joi.string().max(5000).allow('', null),
  deliveryAddress: Joi.string().max(2000).allow('', null),
  expiresAt: Joi.date().iso().greater('now'),
}).min(1);

const acceptEscrowSchema = Joi.object({
  accept: Joi.boolean().required(),
});

const raiseDisputeSchema = Joi.object({
  reason: Joi.string().min(10).max(3000).required(),
});

module.exports = {
  createEscrowSchema,
  updateEscrowSchema,
  acceptEscrowSchema,
  raiseDisputeSchema,
};
