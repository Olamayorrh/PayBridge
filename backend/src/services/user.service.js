const userRepository = require('../repositories/user.repository');
const { hashPassword } = require('../config/bcrypt');

class UserService {
  async createUser(data) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(data.password);

    return userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);

    if (!user) throw new Error('User not found');

    return user;
  }

  async getAllUsers() {
    return userRepository.findAll();
  }

  async updateUser(id, data) {
    await this.getUserById(id);
    return userRepository.update(id, data);
  }

  async deleteUser(id) {
    return userRepository.delete(id);
  }
}

module.exports = new UserService();

//What is this file doing?
/*This file defines a `UserService` class that provides methods for managing user-related operations in an application. The service interacts with the `UserRepository` to perform database operations and uses the `hashPassword` function to securely handle user passwords. 
The methods in this service include creating a new user, retrieving a user by ID, retrieving all users, updating a user's information, and deleting a user. By encapsulating these operations in a service layer, the application can maintain a clear separation of concerns and ensure that business logic related to user management is centralized and reusable across different parts of the application.*/

// Is the use of classes in this file an appropriate industry standard? why not use functions instead?
/*The use of classes in this file is an appropriate industry standard for structuring services in a Node.js application. Classes provide a clear and organized way to group related methods and properties together, which can enhance code readability and maintainability. 
Using a class allows for the creation of an instance of the service, which can be beneficial for managing state or dependencies if needed in the future.
 However, it is also possible to use functions instead of classes to achieve similar functionality. The choice between classes and functions often comes down to personal preference and the specific requirements of the application. Functions can be simpler and more concise for stateless operations, while classes can provide a more structured approach for complex services that may require state management or inheritance.
  Ultimately, both approaches are valid, and the decision should be based on the specific use case and coding style preferences of the development team.*/