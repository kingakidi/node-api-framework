const bcrypt = require("bcryptjs");
const { User, Role, Permission } = require("../models");

class UsersServices {
  async getAllUser({ data }) {
    return await User.findAndCountAll(data);
  }

  async getUserById(id) {
    return User.findOne({ where: { id } });
  }

  async getUserByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async createUser(req) {
    let {
      fullname,
      email,
      password,
      imageUrl,
      permissionId,
      gender,
      dateOfBirth,
      roleId,
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = {
      fullname: fullname,
      email: email,
      password: hashPassword,
      imageUrl: imageUrl,
      permissionId: permissionId,
      gender,
      dateOfBirth,
      roleId,
    };

    let result = await User.create(user);

    if (result)
      return {
        id: result.id,
        fullname: result.fullname,
        email: result.email,
        imageUrl: result.imageUrl,
        updatedAt: result.updatedAt,
        createdAt: result.createdAt,
      };
  }

  async verifyEmail(email) {
    return await User.findOne({ where: { email: email } });
  }

  async getUserRoleAndPermissions(userId) {
    return await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Role,
          required: true,
        },
      ],
    });
  }

  async updateUser(id, req) {
    const { fullname, imageUrl } = req.body;
    let data = { fullname, imageUrl };

    return await User.update(data, { where: { id } });
  }
  async deleteUser(id) {
    return await User.destroy({ where: { id } });
  }

  async getUserByIdWithPassword(id) {
    return User.scope("withPassword").findOne({ where: { id } });
  }

  async getUserByEmailWithPassword(email) {
    return User.scope("withPassword").findOne({ where: { email } });
  }
}

module.exports = new UsersServices();
