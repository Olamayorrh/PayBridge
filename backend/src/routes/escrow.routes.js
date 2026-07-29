// src/routes/escrow.routes.js
'use strict';

const express = require('express');
const router = express.Router();

const escrowController = require('../controllers/escrow.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.use(authenticateToken);

// =====================================================
// CREATE  (buyer creates an escrow agreement for a seller)
// =====================================================
router.post('/', escrowController.create);

// =====================================================
// LIST MINE  (both buyer and seller side)
// =====================================================
router.get('/', escrowController.listMine);

// =====================================================
// GET ONE
// =====================================================
router.get('/:id', escrowController.getById);

// =====================================================
// UPDATE TERMS  (buyer only, before funding)
// =====================================================
router.put('/:id', escrowController.update);

// =====================================================
// SELLER ACCEPTS / DECLINES TERMS
// =====================================================
router.post('/:id/accept', escrowController.acceptTerms);

// =====================================================
// BUYER FUNDS THE ESCROW
// =====================================================
router.post('/:id/fund', escrowController.fund);

// =====================================================
// SELLER MARKS WORK IN PROGRESS
// =====================================================
router.post('/:id/start', escrowController.startProgress);

// =====================================================
// SELLER MARKS DELIVERED
// =====================================================
router.post('/:id/deliver', escrowController.markDelivered);

// =====================================================
// BUYER CONFIRMS -> RELEASES FUNDS TO SELLER
// =====================================================
router.post('/:id/confirm', escrowController.confirmAndRelease);

// =====================================================
// CANCEL  (before funding)
// =====================================================
router.post('/:id/cancel', escrowController.cancel);

module.exports = router;
