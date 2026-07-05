const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};

