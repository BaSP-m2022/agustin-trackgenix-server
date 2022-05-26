import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().required().min(3).max(30),
    lastName: Joi.string().required().min(3).max(30),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required().alphanum().min(8),
    dni: Joi.number().integer().min(1000000).max(99999999)
      .required(),
    address: Joi.string().required().min(5).max(30),
    city: Joi.string().required().min(3).max(30),
    zip: Joi.number().required().min(1000).max(9999),
    status: Joi.boolean().required(),
    role: Joi.string().valid('DEV', 'QA', 'PM').required(),
    projects: Joi.array().items(Joi.string().alphanum().length(24)).required(),
  });

  const validate = employeeValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: 'There was an error with the validation',
      data: validate.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().optional().min(3).max(30),
    lastName: Joi.string().optional().min(3).max(30),
    email: Joi.string().email().lowercase().optional(),
    password: Joi.string().optional().alphanum().min(8),
    dni: Joi.number().integer().min(1000000).max(99999999)
      .optional(),
    address: Joi.string().optional().min(5).max(30),
    city: Joi.string().optional().min(3).max(30),
    zip: Joi.number().optional().min(1000).max(9999),
    status: Joi.boolean().optional(),
    role: Joi.string().valid('DEV', 'QA', 'PM').optional(),
    projects: Joi.array().items(Joi.string().alphanum().length(24)).optional(),
  });

  const validate = employeeValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: 'There was an error with the validation',
      data: validate.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreate,
  validateUpdate,
};
