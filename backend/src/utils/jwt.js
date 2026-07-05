// src/utils/jwt.js
'use strict';

const jwt = require('jsonwebtoken');

// ─────────────────────────────────────────────────────────────────
// BUG FIX: Both secrets were hard-coded strings in the original.
// Hard-coded secrets are a critical security vulnerability – any
// developer who reads the source can forge tokens.
// Now we read from environment variables and crash early with a
// clear message if they are missing, so the problem is impossible
// to miss in development.
// ─────────────────────────────────────────────────────────────────
const ACCESS_SECRET  = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
const ACCESS_EXPIRY  = process.env.JWT_ACCESS_EXPIRES_IN  || '15m';
const REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

if (!ACCESS_SECRET) {
  throw new Error(
    '[jwt.js] JWT_SECRET is not set. Add it to your .env file.'
  );
}

// ──────────────────────────────────────────
// ACCESS TOKEN  (short-lived, 15 min default)
// ──────────────────────────────────────────
function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRY }
  );
}

// ──────────────────────────────────────────
// REFRESH TOKEN  (long-lived, 7 days default)
// ──────────────────────────────────────────
function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id },
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRY }
  );
}

// ──────────────────────────────────────────
// VERIFY HELPERS
// ──────────────────────────────────────────
function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
