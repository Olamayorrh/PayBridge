const userService = require('../services/user.service');
const { CreateUserDTO, UpdateUserDTO } = require('../dtos/user.dto');

class UserController {
  async create(req, res) {
    try {
      const dto = new CreateUserDTO(req.body);
      const user = await userService.createUser(dto);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getAll(req, res) {
    const users = await userService.getAllUsers();
    res.json({ success: true, data: users });
  }

  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  }

  async update(req, res) {
    try {
      const dto = new UpdateUserDTO(req.body);
      const user = await userService.updateUser(req.params.id, dto);

      res.json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async delete(req, res) {
    const user = await userService.deleteUser(req.params.id);
    res.json({ success: true, data: user });
  }
}

module.exports = new UserController();