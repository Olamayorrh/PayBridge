// src/repositories/transaction.repository.js
'use strict';

const prisma = require('../config/prisma');

class TransactionRepository {
  async findById(id) {
    return prisma.transaction.findUnique({
      where: { id },
      include: { payment: true, escrow: { select: { id: true, title: true, status: true } } },
    });
  }

  async findForUser(userId, { type, status, escrowId, from, to, page = 1, limit = 20 } = {}) {
    const where = {
      userId,
      ...(type ? { type } : {}),
      ...(status ? { status } : {}),
      ...(escrowId ? { escrowId } : {}),
      ...(from || to
        ? { createdAt: { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) } }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: { payment: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.transaction.count({ where }),
    ]);

    return { items, total, page, limit };
  }
}

module.exports = new TransactionRepository();
