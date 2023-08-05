const Joi = require("joi");

exports.add_user = async (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  // console.log(error.length);
  if (error)
    return res.status(400).json({
      success: false,
      message: "validation failed",
      error: error.details,
      data: null,
    });
  next();
};

exports.update_user = async (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    gender: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  // console.log(error.length);
  if (error)
    return res.status(400).json({
      success: false,
      message: "validation failed",
      error: error.details,
      data: null,
    });
  next();
};
