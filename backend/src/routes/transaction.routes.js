// src/routes/transaction.routes.js
'use strict';

const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transaction.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

router.use(authenticateToken);

// =====================================================
// LIST MY TRANSACTION HISTORY
// =====================================================
router.get('/', transactionController.listMine);

// =====================================================
// GET ONE
// =====================================================
router.get('/:id', transactionController.getById);

// =====================================================
// REQUEST A WITHDRAWAL
// =====================================================
router.post('/withdrawals', transactionController.requestWithdrawal);

// =====================================================
// ADMIN: MANUAL WALLET ADJUSTMENT (always audited)
// =====================================================
router.post('/admin/adjustments', authorizeRoles('ADMIN'), transactionController.adminAdjust);

module.exports = router;
