// src/routes/auth.routes.js
'use strict';

const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/auth.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// ─────────────────────────────────────────────────────────────────
// PUBLIC ROUTES  (no JWT required)
// ─────────────────────────────────────────────────────────────────
router.post('/register', authController.register);
router.post('/login',    authController.login);
router.post('/refresh',  authController.refresh);

// ─────────────────────────────────────────────────────────────────
// PROTECTED ROUTES  (valid access token required)
// ─────────────────────────────────────────────────────────────────
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;
