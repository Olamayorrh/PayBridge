// src/dtos/escrow.dto.js
'use strict';

class CreateEscrowDTO {
  constructor({ sellerId, title, description, amount, currency, deliveryAddress, expiresAt }) {
    this.sellerId = sellerId;
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.currency = currency;
    this.deliveryAddress = deliveryAddress;
    this.expiresAt = expiresAt;
  }
}

class UpdateEscrowDTO {
  constructor({ title, description, deliveryAddress, expiresAt }) {
    this.title = title;
    this.description = description;
    this.deliveryAddress = deliveryAddress;
    this.expiresAt = expiresAt;
  }
}

module.exports = { CreateEscrowDTO, UpdateEscrowDTO };
