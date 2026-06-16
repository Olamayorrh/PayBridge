const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

module.exports = prisma;

/*This file is a configuration module for setting up and exporting an instance of the Prisma Client, which is an Object-Relational Mapping (ORM) tool used to interact with a database in a Node.js application.

1. **Importing PrismaClient**: The file starts by importing the `PrismaClient` class from the `@prisma/client` package. This class is used to create an instance of the Prisma Client, which provides methods for querying and manipulating the database.
2. **Creating an instance of PrismaClient**: An instance of `PrismaClient` is created and assigned to the variable `prisma`. The constructor is called with a configuration object that specifies logging options. In this case, it is set to log only 'error' and 'warn' messages, which helps in debugging and monitoring database interactions without overwhelming the logs with too much information.
3. **Exporting the prisma instance**: The module exports the `prisma` instance, making it available for use in other parts of the application. This allows other modules to import this configuration and use the `prisma` client to perform database operations such as creating, reading, updating, and deleting records.
Overall, this file serves as a centralized configuration for the Prisma Client, ensuring that all database interactions in the application are consistent and that logging is appropriately configured for error handling and debugging purposes.*/