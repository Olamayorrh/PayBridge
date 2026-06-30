const prisma = require('../config/prisma');

class UserRepository {
  async create(data) {
    return prisma.user.create({ data });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id, data) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    // soft delete (production pattern)
    return prisma.user.update({
      where: { id },
      data: { status: 'DELETED' },
    });
  }
}

module.exports = new UserRepository();

//Explain what a repository is in the context of software development. What is the purpose of this file? How does it interact with the database?
/*In the context of software development, a repository is a design pattern that provides an abstraction layer between the data access logic and the business logic of an application. It allows developers to interact with the database in a more structured and organized way, without having to write raw database queries directly in the business logic. The repository pattern helps to separate concerns, making the codebase more maintainable and testable.
The purpose of this file is to define a `UserRepository` class that encapsulates all the database operations related to user entities. This class provides methods for creating, finding, updating, and deleting user records in the database. By using this repository, other parts of the application can interact with user data without needing to know the details of how the data is stored or accessed.
The `UserRepository` interacts with the database through the Prisma Client, which is an Object-Relational Mapping (ORM) tool. Each method in the `UserRepository` uses Prisma's API to perform specific database operations. For example, the `create` method uses `prisma.user.create` to insert a new user record into the database, while the `findByEmail` method uses `prisma.user.findUnique` to retrieve a user record based on the email address. The repository abstracts away the complexities of database interactions, allowing other parts of the application to work with user data in a more intuitive and consistent manner. Overall, this file serves as a crucial component in managing user data and ensuring that database operations are handled efficiently and securely.*/