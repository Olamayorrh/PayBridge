class CreateUserDTO {
  constructor({ firstName, lastName, email, phone, password, role }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.role = role;
  }
}

class UpdateUserDTO {
  constructor({ firstName, lastName, phone }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }
}

module.exports = {
  CreateUserDTO,
  UpdateUserDTO,
  
};

//Explain this file in detail. What is the purpose of this file? What are DTOs? Why are they used?

/*This file defines two Data Transfer Object (DTO) classes, `CreateUserDTO` and `UpdateUserDTO`, which are used to structure and validate data when creating or updating user information in an application.
1. **Data Transfer Objects (DTOs)**: DTOs are simple objects that are used to transfer data between different layers of an application, such as between the client and server or between different services. They typically contain only the necessary fields required for a specific operation and may include validation logic to ensure that the data is in the correct format.
2. **CreateUserDTO**: This class is designed for creating a new user. It has a constructor that takes an object with properties `firstName`, `lastName`, `email`, `phone`, `password`, and `role`. These properties are assigned to the instance of the class, allowing for easy access and validation when creating a new user.
3. **UpdateUserDTO**: This class is intended for updating existing user information. It has a constructor that takes an object with properties `firstName`, `lastName`, and `phone`. This allows for updating only specific fields of a user's information without requiring all fields to be provided.
4. **Purpose of the file**: The main purpose of this file is to define the structure of the data that will be used when creating or updating user information. By using DTOs, developers can ensure that the data being passed around in the application is consistent and adheres to a defined format. This can help prevent errors and improve the maintainability of the code by centralizing the data structure definitions in one place. Additionally, DTOs can be used to implement validation logic to ensure that the data being processed meets certain criteria before it is used in the application. Overall, this file serves as a crucial part of the application's data handling and validation strategy.*/