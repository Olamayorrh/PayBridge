// src/controllers/auth.controller.js
'use strict';

const userService = require('../services/user.service');

class AuthController {

  // ────────────────────────
  // REGISTER
  // ────────────────────────
  async register(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      const status = err.statusCode || 400;
      res.status(status).json({ success: false, message: err.message });
    }
  }

  // ────────────────────────
  // LOGIN
  // ────────────────────────
  async login(req, res, next) {
    try {
      const result = await userService.loginUser(req.body);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  // ────────────────────────
  // REFRESH TOKEN
  // ────────────────────────
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'refreshToken is required',
        });
      }

      const result = await userService.refreshAccessToken(refreshToken);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  // ────────────────────────
  // LOGOUT
  // ────────────────────────
  async logout(req, res, next) {
    try {
      // req.user is guaranteed by authenticateToken middleware on this route
      const { refreshToken } = req.body;
      const result = await userService.logout(req.user.id, refreshToken);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new AuthController();
