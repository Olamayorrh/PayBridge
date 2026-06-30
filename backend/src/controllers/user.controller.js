// src/controllers/user.controller.js
'use strict';

const userService   = require('../services/user.service');
const { UpdateUserDTO } = require('../dtos/user.dto');

class UserController {

  // ────────────────────────
  // GET ALL  (admin only)
  // ────────────────────────
  async getAll(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json({ success: true, data: users });
    } catch (err) {
      next(err); // delegate to globalErrorHandler
    }
  }

  // ────────────────────────
  // GET BY ID
  // ────────────────────────
  async getById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  }

  // ────────────────────────
  // UPDATE
  // ────────────────────────
  async update(req, res, next) {
    try {
      const dto  = new UpdateUserDTO(req.body);
      const user = await userService.updateUser(req.params.id, dto);
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  // ────────────────────────
  // DELETE  (admin only)
  // ────────────────────────
  async delete(req, res, next) {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new UserController();
