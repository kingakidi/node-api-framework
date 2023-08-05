const roleServices = require("../services/role.service");
const usersServices = require("../services/users.services");
const emailServices = require("../services/email.services");
const tokenServices = require("../services/token.services");
const ndigit = require("n-digit-token");

exports.index = async function (req, res, next) {
  try {
    // pages
    const limit = req.params.limit || 10;
    const offset = req.params.page || 0;

    // limit
    //
    let { count, rows } = await usersServices.getAllUser({
      limit,
      offset,
    });
    return res.status(200).json({
      status: true,
      message: "user fetch successfully",
      data: {
        users: rows,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.store = async function (req, res, next) {
  // validate permissions
  try {
    // check if roles exist on the system

    const isRole = await roleServices.getAllRole();

    if (isRole && isRole.length) {
      // validate email
      let isEmail = await usersServices.verifyEmail(req.body.email);

      if (isEmail) {
        return res.status(400).send({
          success: false,
          message: "Email already exist",
          data: null,
        });
      } else {
        // register user
        const userData = await usersServices.createUser(req);

        // add token

        if (userData) {
          const token = ndigit.gen(6);
          // Send email confirmation
          const emailVerify = emailServices.elasticEmailConfirmation({
            email: req.body.email,
            token,
          });

          if (emailVerify) {
            tokenServices.storeToken({
              token,
              email: req.body.email,
              userId: userData.id,
            });
          }

          res.status(201).send({
            success: true,
            message: "User Created Successfully",
            data: userData,
          });
        }
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "no registered role on the system",
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async function (req, res, next) {
  // get id params
  try {
    let { id } = req.params;

    // check user exist
    let user = await usersServices.getUserById(id);

    if (user) {
      // check for resouces ownership

      if (user.userId === req.user.id) {
        const user = await usersServices.updateUser(id, req);

        delete user.password;

        return res.status(200).json({
          status: true,
          message: "user updated successfully",
          data: user,
        });
      } else {
        return res.status(403).json({
          status: false,
          message: "unauthorized",
          data: null,
        });
      }
    }

    return res.status(400).send({
      success: false,
      message: "Invalid User Id",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async function (req, res, next) {
  try {
    let { id } = req.params;
    let user = await usersServices.getUserById(id);

    if (user) {
      if (user.id === req.user.id) {
        const deleteUser = await usersServices.deleteUser(id);

        if (deleteUser) {
          return res.status(204).json({
            status: true,
            message: "user deleted successfully",
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
        return res.status(403).json({
          status: false,
          message: "unauthorized",
          data: null,
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid User id",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.get_by_id = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await usersServices.getUserById(id);

    delete user.password;

    if (user) {
      return res.status(200).json({
        status: true,
        message: "user fetch successfully",
        data: user,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "user with the id not found",
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.reset_password = async function (req, res, next) {};
