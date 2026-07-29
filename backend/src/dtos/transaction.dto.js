// src/dtos/transaction.dto.js
'use strict';

class ListTransactionsQueryDTO {
  constructor({ type, status, escrowId, from, to, page, limit }) {
    this.type = type;
    this.status = status;
    this.escrowId = escrowId;
    this.from = from;
    this.to = to;
    this.page = page ? Number(page) : 1;
    this.limit = limit ? Number(limit) : 20;
  }
}

class AdminAdjustmentDTO {
  constructor({ userId, currency, amount, direction, reason }) {
    this.userId = userId;
    this.currency = currency;
    this.amount = amount;
    this.direction = direction; // 'CREDIT' | 'DEBIT'
    this.reason = reason;
  }
}

module.exports = { ListTransactionsQueryDTO, AdminAdjustmentDTO };


