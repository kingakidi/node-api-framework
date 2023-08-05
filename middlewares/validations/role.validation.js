const Joi = require("joi");

exports.add_role = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    permissions: Joi.array(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).json({
      success: false,
      message: "validation failed",
      error: error.details,
      data: null,
    });

  next();
};

exports.update_role = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    permissions: Joi.array(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).json({
      success: false,
      message: "validation failed",
      error: error.details,
      data: null,
    });

  next();
};

exports.change_user_role = async (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    roleId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).json({
      success: false,
      message: "validation failed",
      error: error.details,
      data: null,
    });

  next();
};
