// src/middlewares/auth.middleware.js
'use strict';


const { verifyAccessToken } = require('../utils/jwt');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token      = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token missing',
    });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user      = decoded; // { id, email, role, iat, exp }
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}

module.exports = authenticateToken;

//what does use strict do in node.js
/*The `'use strict';` directive in Node.js (and JavaScript in general) is used to enable strict mode, which is a way to opt into a restricted variant of JavaScript. Strict mode helps catch common coding mistakes and "unsafe" actions, making your code more robust and secure. Here are some key features and benefits of using strict mode:
1. **Eliminates some silent errors**: In strict mode, certain actions that would normally fail silently will throw errors instead. For example, assigning a value to an undeclared variable will throw a `ReferenceError`.
2. **Prevents the use of certain keywords**: Strict mode reserves certain keywords for future versions of JavaScript, preventing their use as variable names or function names.
3. **Disallows duplicate parameter names**: In strict mode, you cannot have duplicate parameter names in function definitions.
4. **Changes the behavior of `this`**: In strict mode, `this` is `undefined` in functions that are called without an explicit context (e.g., `myFunction()`), rather than defaulting to the global object.
5. **Prevents the use of `with` statements**: The `with` statement is not allowed in strict mode, which helps avoid ambiguity and improves code clarity.
6. **Throws errors for assignments to non-writable properties**: In strict mode, attempting to assign a value to a read-only property will throw an error.
7. **Enforces better coding practices**: By catching common mistakes and enforcing stricter rules, strict mode encourages developers to write cleaner and more maintainable code.
Overall, using `'use strict';` at the beginning of your JavaScript files or functions can help you avoid potential pitfalls and improve the quality of your code. */