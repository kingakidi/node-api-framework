const roleService = require("../services/role.service");
const usersServices = require("../services/users.services");

exports.index = async function (req, res, next) {
  try {
    let roles = await roleService.getAllRole();

    return res.status(200).send({
      message: "Roles Fetch Successfully",
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};

exports.store = async function (req, res, next) {
  // Save the values into the database

  try {
    const { title, description } = req.body;

    const data = {
      title: title,
      description: description,
    };

    // check if title already exist
    let titleCheck = await roleService.getAllRoleByTitle(title);

    if (!titleCheck) {
      const addRole = await roleService.storeRole(req);

      if (addRole) {
        return res.status(201).send({
          success: true,
          message: "Role created successfully",
          data: addRole,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "something went wrong",
          data: null,
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "role already exist",
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async function (req, res, next) {
  try {
    const { id } = req.params;

    const isRole = await roleService.getAllRoleById(id);

    if (isRole) {
      // check if role already exist
      let updateRole = await roleService.updateRole(id, req);

      if (updateRole) {
        const role = await roleService.getAllRoleById(id);

        return res.status(200).send({
          success: true,
          message: "Role updated successfully",
          data: role,
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid role id",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.destroy = async function (req, res, next) {
  try {
    const { id } = req.params;

    const role = await roleService.getAllRoleById(id);

    if (role) {
      const deleteRole = await roleService.deleteRoleById(id);

      if (deleteRole) {
        return res.status(204).send({
          success: true,
          message: "Role deleted successfully",
          data: null,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "something went wrong",
          data: null,
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid Role id",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.role_by_id = async function (req, res, next) {
  try {
    let { id } = req.params;
    const role = await roleService.getAllRoleById(id);

    if (role) {
      return res.status(200).send({
        success: true,
        message: "Role fetch successfully",
        data: role,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid Role id",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.role_by_title = async function (req, res, next) {
  try {
    let { title } = req.params;
    const role = await roleService.getAllRoleByTitle(title);

    if (role) {
      return res.status(200).send({
        success: true,
        message: "Roles Fetch successfully",
        data: role,
      });
    } else {
      return res.status(400).send({
        success: true,
        message: "Roles does not exit",
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.add_user_role = async function (req, res, next) {
  // verify user
  const isUser = await usersServices.getUserById(req.body.userId);

  const isRole = await roleService.getAllRoleById(req.body.roleId);

  if (isUser && isRole) {
    const changeRole = await roleService.changeUserRole(req);

    if (changeRole) {
      return res.status(200).json({
        status: true,
        message: "role change successfully",
        data: null,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "unable to change user role ",
        data: null,
      });
    }
  } else {
    return res.status(404).json({
      status: false,
      message: "user does not exist",
      data: null,
    });
  }
  // change the users roles
};
