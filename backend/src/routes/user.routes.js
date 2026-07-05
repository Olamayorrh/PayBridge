const express = require('express');
const router = express.Router();

const userController =
  require('../controllers/user.controller');

const authenticateToken =
  require('../middlewares/auth.middleware');

const authorizeRoles =
  require('../middlewares/role.middleware');

// =====================================================
// GET ALL USERS (ADMIN ONLY)
// =====================================================
router.get(
  '/',
  authenticateToken,
  authorizeRoles('ADMIN'),
  userController.getAll
);

// =====================================================
// GET USER BY ID (ADMIN OR SELF)
// =====================================================
router.get(
  '/:id',
  authenticateToken,
  userController.getById
);

// =====================================================
// UPDATE USER (ADMIN OR SELF - optional later)
// =====================================================
router.put(
  '/:id',
  authenticateToken,
  userController.update
);

// =====================================================
// DELETE USER (ADMIN ONLY - recommended)
// =====================================================
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  userController.delete
);

module.exports = router;