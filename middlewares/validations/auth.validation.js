const Joi = require("joi");

exports.email_auth_validation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: "validation failed",
      error: error.details,
    });
  } else {
    next();
  }
};

exports.login_validation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),

    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: "validation failed",
      error: error.details,
    });
  } else {
    next();
  }
};
