const Joi = require("joi");

exports.add_permission = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),

    description: Joi.string(),

    meta: Joi.string().required(),

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

exports.update_permission = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),

    description: Joi.string(),

    meta: Joi.string().required(),

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
