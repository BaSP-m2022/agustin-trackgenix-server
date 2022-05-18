import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const authSchema = Joi.object({
    name: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().alphanum().min(6).required(),
    status: Joi.boolean().required(),
  });
  const validations = authSchema.validate(req.body);
  if (validations.error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: validations.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const authSchema = Joi.object({
    name: Joi.string().min(3).optional(),
    lastName: Joi.string().min(3).optional(),
    email: Joi.string().email().lowercase().optional(),
    password: Joi.string().alphanum().min(6).optional(),
    status: Joi.boolean().optional(),
  });
  const validations = authSchema.validate(req.body);
  if (validations.error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: validations.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreate,
  validateUpdate,
};
