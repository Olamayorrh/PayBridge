// src/controllers/transaction.controller.js
'use strict';

const transactionService = require('../services/transaction.service');

class TransactionController {
  async getById(req, res, next) {
    try {
      const transaction = await transactionService.getById(req.params.id, req.user);
      res.json({ success: true, data: transaction });
    } catch (err) {
      next(err);
    }
  }

  async listMine(req, res, next) {
    try {
      const result = await transactionService.listForUser(req.user.id, req.query);
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  async requestWithdrawal(req, res, next) {
    try {
      const transaction = await transactionService.requestWithdrawal(req.user.id, req.body);
      res.status(201).json({ success: true, data: transaction });
    } catch (err) {
      next(err);
    }
  }

  async adminAdjust(req, res, next) {
    try {
      const transaction = await transactionService.adminAdjust(req.user.id, req.body);
      res.status(201).json({ success: true, data: transaction });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TransactionController();
