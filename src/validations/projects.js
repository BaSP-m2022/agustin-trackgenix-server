const Joi = require('joi');

const validateCreate = (req, res, next) => {
  const employeeSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    lastName: Joi.string().min(4).max(50).required(),
    role: Joi.string().valid('DEV', 'QA', 'PM').required(),
  });
  const ratesSchema = Joi.object({
    dev: Joi.number().required(),
    pm: Joi.number().required(),
    qa: Joi.number().required(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    client: Joi.string().required(),
    employees: Joi.array().items(employeeSchema).allow(null),
    rates: ratesSchema,
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error with the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};
const validateUpdate = (req, res, next) => {
  const employeeSchema = Joi.object({
    name: Joi.string().min(4).max(50).optional(),
    lastName: Joi.string().min(4).max(50).optional(),
    role: Joi.string().valid('DEV', 'QA', 'PM').optional(),
  });
  const ratesSchema = Joi.object({
    dev: Joi.number().optional(),
    pm: Joi.number().optional(),
    qa: Joi.number().optional(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().min(4).max(50).optional(),
    description: Joi.string().optional(),
    status: Joi.string().optional(),
    client: Joi.string().optional(),
    employees: Joi.array().items(employeeSchema).allow(null),
    rates: ratesSchema.optional(),
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error with the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};
export default {
  validateCreate,
  validateUpdate,
};
