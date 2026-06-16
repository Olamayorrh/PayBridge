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

//what is the purpose of this file? please explain in detail

/*This file is a configuration module for handling password hashing and comparison using the bcrypt library in a Node.js application.

1. **Importing bcrypt**: The file starts by importing the `bcryptjs` library, which is a popular library for hashing passwords in JavaScript applications.
2. **SALT_ROUNDS**: A constant `SALT_ROUNDS` is defined with a value of 10. This value determines the cost factor for the hashing algorithm, which affects how long it takes to hash a password. A higher number means more security but also more time to hash.
3. **hashPassword function**: This asynchronous function takes a plain text password as input and returns a hashed version of that password using bcrypt's `hash` method. It uses the defined `SALT_ROUNDS` to ensure that the hashing process is secure.
4. **comparePassword function**: This asynchronous function takes a plain text password and a hashed password as inputs and returns a boolean indicating whether the plain text password matches the hashed password. It uses bcrypt's `compare` method to perform this check.
5. **Exporting functions**: The module exports both the `hashPassword` and `comparePassword` functions, making them available for use in other parts of the application. This allows other modules to easily hash passwords when creating new user accounts and to compare passwords during login attempts.
Overall, this file provides essential functionality for securely handling user passwords in an application, ensuring that passwords are not stored in plain text and that they can be verified correctly during authentication processes.*/