const Joi = require('joi');

const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('BUYER', 'SELLER', 'ADMIN'),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
  phone: Joi.string(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};

/*This file defines validation schemas for user-related operations using the Joi library in a Node.js application.
1. **Importing Joi**: The file starts by importing the `Joi` library, which is a powerful schema description language and data validator for JavaScript.
2. **createUserSchema**: This schema is defined for validating the data when creating a new user. It specifies that:
   - `firstName` must be a string with a minimum length of 2 characters and is required.
   - `lastName` must also be a string with a minimum length of 2 characters and is required.
   - `email` must be a valid email address and is required.
   - `phone` is an optional string field.
   - `password` must be a string with a minimum length of 6 characters and is required.
   - `role` must be a string that can only take the values 'BUYER', 'SELLER', or 'ADMIN'.
3. **updateUserSchema**: This schema is defined for validating the data when updating an existing user. It specifies that:
   - `firstName` can be a string with a minimum length of 2 characters (optional).
   - `lastName` can also be a string with a minimum length of 2 characters (optional).
   - `phone` can be a string (optional).
4. **Exporting the schemas**: The module exports both the `createUserSchema` and `updateUserSchema`, making them available for use in other parts of the application. This allows other modules to import these schemas and use them to validate incoming data when creating or updating user information, ensuring that the data adheres to the defined structure and constraints before it is processed further in the application. Overall, this file plays a crucial role in maintaining data integrity and preventing invalid data from being processed in the application.*/

//Explain more about the Joi library and how it is used in this file. What are the benefits of using Joi for validation?
/*The Joi library is a powerful and flexible schema description language and data validator for JavaScript. It allows developers to define schemas for their data and validate that the data conforms to those schemas before it is processed further in the application. In this file, Joi is used to create validation schemas for user-related operations, specifically for creating and updating user information.

The benefits of using Joi for validation include:
1. **Declarative Syntax**: Joi provides a clear and declarative syntax for defining validation rules. This makes it easy to read and understand the validation logic at a glance.
2. **Comprehensive Validation**: Joi supports a wide range of validation rules, including string length, email format, required fields, optional fields, and more. This allows developers to create complex validation logic with ease.
3. **Error Handling**: When validation fails, Joi provides detailed error messages that indicate which fields failed validation and why. This can help developers quickly identify and fix issues with the input data.*/
