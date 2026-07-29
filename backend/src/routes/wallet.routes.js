// src/routes/wallet.routes.js
'use strict';

const express = require('express');
const router = express.Router();

const walletController = require('../controllers/wallet.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.use(authenticateToken);

router.get('/', walletController.listMine);

module.exports = router;
