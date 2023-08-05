const { Role } = require("../models");

class RoleServices {
  async getAllRole() {
    return await Role.findAll();
  }
  async getAllRoleById(id) {
    return await Role.findOne({ where: { id } });
  }
  async storeRole(req) {
    return await Role.create(req.body);
  }
  async updateRole(id, req) {
    return await Role.update(req.body, { where: { id } });
  }
  async deleteRole(id) {
    return await Role.destroy({ where: { id } });
  }

  async getAllRoleByTitle(title) {
    return await Role.findOne({ where: { title } });
  }

  async changeUserRole(req) {
    const { roleId, userId } = req.body;
    return await Role.update({ roleId }, { where: { id: userId } });
  }
}

module.exports = new RoleServices();
