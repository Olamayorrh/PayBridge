const logger = require('../config/logger');

function globalErrorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  logger.error(err.message, {
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    userId: req.user?.id,
  });

  // AppError (isOperational) messages are safe to show the client.
  // Anything else (a bug, a DB driver error, etc.) should never leak
  // its raw message in production.
  const isSafe = err.isOperational || process.env.NODE_ENV !== 'production';

  return res.status(statusCode).json({
    success: false,
    message: isSafe ? err.message : 'Internal Server Error',
    code: err.code,
  });
}

module.exports = globalErrorHandler;

//why is globalErrorHandler not used for the whole application. I thought since its named it can handle all errors. Why is it not used in the whole application?
//is it that it was wrongly named? or implemented? or is it that it is not used in the whole application because it is not imported in the app.js file?
/* The `globalErrorHandler` middleware is designed to handle errors that occur during the request-response cycle in an Express application. However, for it to be effective across the entire application, it must be properly integrated into the Express middleware stack. Here are some reasons why it might not be used for the whole application:
1. **Not Imported in app.js**: If the `globalErrorHandler` is not imported and used in the main application file (typically `app.js` or `server.js`), it won't be able to catch errors from other parts of the application. It needs to be added as the last middleware in the stack to ensure it catches any errors that occur in preceding middleware or route handlers.

2. **Middleware Order**: In Express, the order of middleware matters. The `globalErrorHandler` should be placed after all other middleware and routes. If it's placed before certain routes or middleware, it won't catch errors that occur after its execution.

3. **Specific Error Handling**: Some parts of the application might have their own error handling logic, which could prevent the global error handler from being invoked. For example, if a route has a try-catch block that handles errors internally, those errors won't propagate to the global error handler.

4. **Naming Confusion**: The name `globalErrorHandler` suggests that it handles all errors, but its effectiveness depends on how it's integrated into the application. If it's not used correctly, it won't serve its intended purpose.

5. **Implementation Issues**: If there are bugs or issues in the implementation of the `globalErrorHandler`, it might not function as expected. For example, if it doesn't properly check for the `isOperational` property or doesn't log errors correctly, it may not provide the intended error handling.

In summary, while the `globalErrorHandler` is designed to handle errors globally, its effectiveness depends on proper integration and usage within the application. It should be imported and used in the main application file, placed at the correct position in the middleware stack, and ensure that other parts of the application do not override its functionality. */
