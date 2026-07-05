// src/services/user.service.js
'use strict';

const userRepository = require('../repositories/user.repository');
const { hashPassword, comparePassword } = require('../config/bcrypt');
const {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
} = require('../validators/user.validator');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../utils/jwt');
const prisma = require('../config/prisma');

class UserService {

  // ────────────────────────────────────────────
  // CREATE USER (SIGN UP)
  // ────────────────────────────────────────────
  async createUser(data) {
    const { error } = createUserSchema.validate(data);
    if (error) throw new Error(error.details[0].message);

    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new Error('User already exists');

    const hashedPassword = await hashPassword(data.password);

    // BUG FIX: return only safe fields – the original returned the
    // full Prisma row including the hashed password.
    const created = await userRepository.create({
      ...data,
      password: hashedPassword,
    });
    const { password, ...safeUser } = created;
    return safeUser;
  }

  // ────────────────────────────────────────────
  // LOGIN USER
  // ────────────────────────────────────────────
  async loginUser(data) {
    const { error } = loginUserSchema.validate(data);
    if (error) throw new Error(error.details[0].message);

    const user = await userRepository.findByEmail(data.email);
    if (!user) throw new Error('Invalid credentials');

    const isValid = await comparePassword(data.password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // ────────────────────────────────────────────────────────────
    // BUG FIX: The original stored refresh tokens in an in-memory
    // Map (refreshTokenStore).  This means:
    //   1. All sessions are lost every time the server restarts.
    //   2. Horizontal scaling (multiple server instances) breaks
    //      because each instance has its own Map.
    //   3. The RefreshToken model in the Prisma schema was never used.
    //
    // Fix: persist refresh tokens in the database.
    // ────────────────────────────────────────────────────────────
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expiresAt },
    });

    // Update lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data:  { lastLoginAt: new Date() },
    });

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  // ────────────────────────────────────────────
  // REFRESH ACCESS TOKEN
  // ────────────────────────────────────────────
  // BUG FIX: The original signature was (userId, refreshToken).
  // userId was supplied by the controller as req.user?.id, but on a
  // public refresh endpoint req.user is always undefined, so the
  // stored-token lookup always failed.
  //
  // The fix: decode the userId from the refreshToken itself (JWT
  // already contains it), then verify against the DB record.
  // ────────────────────────────────────────────
  async refreshAccessToken(refreshToken) {
    // 1. Verify the JWT signature & expiry
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new Error('Invalid or expired refresh token');
    }

    // 2. Check it exists in the database (not revoked / logged out)
    const stored = await prisma.refreshToken.findFirst({
      where: { token: refreshToken, userId: payload.id },
    });
    if (!stored) throw new Error('Refresh token not recognised');

    // 3. Check DB-level expiry (belt-and-suspenders)
    if (stored.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { id: stored.id } });
      throw new Error('Refresh token has expired');
    }

    // 4. Fetch the user
    const user = await userRepository.findById(payload.id);
    if (!user) throw new Error('User not found');

    // 5. Issue a new access token
    const newAccessToken = generateAccessToken(user);
    return { accessToken: newAccessToken };
  }

  // ────────────────────────────────────────────
  // LOGOUT
  // ────────────────────────────────────────────
  // BUG FIX: Original signature was logout(userId) with no refreshToken
  // param, so it deleted ALL tokens for the user or errored when the
  // Map was empty.  Now we accept an optional refreshToken so we can
  // revoke only the current session; if omitted we revoke all sessions
  // (full logout from all devices).
  // ────────────────────────────────────────────
  async logout(userId, refreshToken) {
    if (refreshToken) {
      // Revoke only this session
      await prisma.refreshToken.deleteMany({
        where: { userId, token: refreshToken },
      });
    } else {
      // Revoke ALL sessions for this user
      await prisma.refreshToken.deleteMany({ where: { userId } });
    }
    return { message: 'Logged out successfully' };
  }

  // ────────────────────────────────────────────
  // GET USER BY ID
  // ────────────────────────────────────────────
  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User not found');
    const { password, ...safeUser } = user;
    return safeUser;
  }

  // ────────────────────────────────────────────
  // GET ALL USERS
  // ────────────────────────────────────────────
  async getAllUsers() {
    const users = await userRepository.findAll();
    return users.map(({ password, ...safe }) => safe);
  }

  // ────────────────────────────────────────────
  // UPDATE USER
  // ────────────────────────────────────────────
  async updateUser(id, data) {
    const { error } = updateUserSchema.validate(data);
    if (error) throw new Error(error.details[0].message);

    // Ensure the user actually exists before updating
    await this.getUserById(id);

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const updated = await userRepository.update(id, data);
    const { password, ...safeUser } = updated;
    return safeUser;
  }

  // ────────────────────────────────────────────
  // DELETE USER
  // ────────────────────────────────────────────
  async deleteUser(id) {
    // Ensure user exists before soft-deleting
    await this.getUserById(id);
    return userRepository.delete(id);
  }
}

module.exports = new UserService();
