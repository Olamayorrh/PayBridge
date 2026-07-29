// src/repositories/escrow.repository.js
'use strict';

const prisma = require('../config/prisma');

const publicInclude = {
  buyer: { select: { id: true, firstName: true, lastName: true, email: true } },
  seller: { select: { id: true, firstName: true, lastName: true, email: true } },
};

class EscrowRepository {
  async create(data) {
    return prisma.escrow.create({ data, include: publicInclude });
  }

  async findById(id) {
    return prisma.escrow.findUnique({ where: { id }, include: publicInclude });
  }

  // Used inside a $transaction for state-changing operations, where
  // we need the row locked/consistent with the wallet + transaction
  // writes happening alongside it.
  async findByIdTx(tx, id) {
    return tx.escrow.findUnique({ where: { id } });
  }

  async findForUser(userId, { status, page = 1, limit = 20 } = {}) {
    const where = {
      OR: [{ buyerId: userId }, { sellerId: userId }],
      ...(status ? { status } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.escrow.findMany({
        where,
        include: publicInclude,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.escrow.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async update(id, data) {
    return prisma.escrow.update({ where: { id }, data, include: publicInclude });
  }

  // Same as update() but runs inside the caller's transaction.
  async updateTx(tx, id, data) {
    return tx.escrow.update({ where: { id }, data });
  }
}

module.exports = new EscrowRepository();
