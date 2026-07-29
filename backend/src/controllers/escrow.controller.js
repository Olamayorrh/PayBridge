// src/controllers/escrow.controller.js
'use strict';

const escrowService = require('../services/escrow.service');

class EscrowController {
  async create(req, res, next) {
    try {
      const escrow = await escrowService.createEscrow(req.user.id, req.body);
      res.status(201).json({ success: true, data: escrow });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const escrow = await escrowService.getEscrowById(req.params.id, req.user.id);
      res.json({ success: true, data: escrow });
    } catch (err) {
      next(err);
    }
  }

  async listMine(req, res, next) {
    try {
      const { status, page, limit } = req.query;
      const result = await escrowService.listForUser(req.user.id, {
        status,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      });
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const escrow = await escrowService.updateEscrow(req.params.id, req.user.id, req.body);
      res.json({ success: true, data: escrow });
    } catch (err) {
      next(err);
    }
  }

  async acceptTerms(req, res, next) {
    try {
      const escrow = await escrowService.acceptTerms(req.params.id, req.user.id, req.body.accept);
      res.json({ success: true, data: escrow });
    } catch (err) {
      next(err);
    }
  }

  async fund(req, res, next) {
    try {
      const escrow = await escrowService.fundEscrow(req.params.id, req.user.id);
      res.json({ success: true, data: escrow });
    } catch (err) {
      next(err);
    }
  }

  async startProgress(req, res, next) {
    try {
      const escrow = await escrowService.startProgress(req.params.id, req.user.id);
      res.json({ success: true, data: escrow });
    } catch (err) {
      next(err);
    }
  }

  async markDelivered(req, res, next) {
    try {
      const escrow = await escrowService.markDelivered(req.params.id, req.user.id);
      res.json({ success: true, data: escrow });
    } catch (err) {
      next(err);
    }
  }

  async confirmAndRelease(req, res, next) {
    try {
      const escrow = await escrowService.confirmAndRelease(req.params.id, req.user.id);
      res.json({ success: true, data: escrow });
    } catch (err) {
      next(err);
    }
  }

  async cancel(req, res, next) {
    try {
      const escrow = await escrowService.cancelEscrow(req.params.id, req.user.id);
      res.json({ success: true, data: escrow });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new EscrowController();
