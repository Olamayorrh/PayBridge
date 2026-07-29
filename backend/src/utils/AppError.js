// src/utils/AppError.js
'use strict';

// Every service in the app should throw AppError (not a bare Error)
// so that globalErrorHandler.middleware.js can respond with the
// correct HTTP status instead of always falling back to 500.
class AppError extends Error {
  constructor(message, statusCode = 400, code = undefined) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;       // machine-readable code, e.g. 'ESCROW_INVALID_TRANSITION'
    this.isOperational = true; // distinguishes expected errors from bugs
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, code) {
    return new AppError(message, 400, code);
  }

  static unauthorized(message = 'Unauthorized', code) {
    return new AppError(message, 401, code);
  }

  static forbidden(message = 'Forbidden', code) {
    return new AppError(message, 403, code);
  }

  static notFound(message = 'Not found', code) {
    return new AppError(message, 404, code);
  }

  static conflict(message, code) {
    return new AppError(message, 409, code);
  }
}

module.exports = AppError;

//explain what this file is doing and why not place it in middleware folder, or GlobalErrorHandler folder
/* This file defines a custom error class called `AppError` that extends the built-in `Error` class in JavaScript. The purpose of this class is to provide a standardized way to handle errors throughout the application, particularly in service layers.
The `AppError` class includes properties such as `statusCode`, `code`, and `isOperational` to differentiate between expected errors (like validation failures or unauthorized access) and unexpected errors (like bugs). It also provides static methods for creating specific types of errors, such as `badRequest`, `unauthorized`, `forbidden`, `notFound`, and `conflict`.

This file is placed in the `utils` folder rather than the `middleware` or `GlobalErrorHandler` folder because it serves as a utility that can be used across different parts of the application, not just in middleware. The `AppError` class is intended to be thrown by services and other components when an error occurs, allowing the global error handler middleware to catch these errors and respond appropriately. By keeping it in the `utils` folder, it emphasizes its role as a reusable utility rather than being tied to a specific middleware implementation. */