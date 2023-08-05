const { User } = require("../models");
const { async_compare } = require("../helpers/functions");
const userServices = require("../services/users.services");

const jwt = require("jsonwebtoken");
const roleService = require("../services/role.service");

exports.login = async function (req, res) {
  const { email, password } = req.body;

  const user = await userServices.getUserByEmailWithPassword(email);

  if (!user)
    return res.status(404).json({
      status: false,
      message: "account does not exist",
      data: null,
    });

  // isActive Account
  if (!user.status)
    return res.status(403).json({
      status: false,
      message: "account suspended",
      data: null,
    });

  // Check the password
  const db_password = user.password;

  const isValidPassword = await async_compare(password, db_password);

  if (isValidPassword) {
    // // add user roles, and list of permissions

    const userRole = await roleService.getAllRoleById(user.roleId);

    const payload = {
      fullname: user.fullname,
      permissionId: user.permissionId,
      userId: user.id,
      id: user.id,
      role: userRole.title,
    };

    const token = jwt.sign(payload, process.env.SECRET);

    // get the user role and permission and add it to the request

    return res.status(200).send({
      status: "success",
      message: "login successfully",

      data: {
        user: {
          fullname: user.fullname,
          permissionId: user.permissionId,
          userId: user.id,
          id: user.id,
        },
        token,
      },
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "invalid password",
      data: null,
    });
  }

  // Get user with email
};

exports.auth_email = async function (req, res) {
  const { email } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (!user)
    return res.status(404).json({
      status: false,
      message: "email does not exist ",
      data: null,
    });

  // isActive Account
  if (!user.status)
    return res.status(403).json({
      status: false,
      message: "account suspended",
      data: null,
    });

  return res.status(200).send({
    status: true,
    message: "user fetch successfully",
    data: {
      user,
    },
  });
};
