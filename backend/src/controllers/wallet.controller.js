// src/controllers/wallet.controller.js
'use strict';

const prisma = require('../config/prisma');

class WalletController {
  async listMine(req, res, next) {
    try {
      const wallets = await prisma.wallet.findMany({ where: { userId: req.user.id } });
      res.json({ success: true, data: wallets });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new WalletController();
