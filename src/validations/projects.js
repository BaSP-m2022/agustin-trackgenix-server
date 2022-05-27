const Joi = require('joi');

const validateCreate = (req, res, next) => {
  const ratesSchema = Joi.object({
    dev: Joi.number().required(),
    pm: Joi.number().required(),
    qa: Joi.number().required(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    description: Joi.string().required(),
    status: Joi.boolean().required(),
    client: Joi.string().required(),
    employees: Joi.array().items(Joi.string().alphanum().length(24)).optional(),
    rates: ratesSchema,
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error with the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};
const validateUpdate = (req, res, next) => {
  const ratesSchema = Joi.object({
    dev: Joi.number().optional(),
    pm: Joi.number().optional(),
    qa: Joi.number().optional(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().min(4).max(50).optional(),
    description: Joi.string().optional(),
    status: Joi.boolean().optional(),
    client: Joi.string().optional(),
    employees: Joi.array().items(Joi.string().alphanum().length(24)).optional(),
    rates: ratesSchema.optional(),
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error with the validation',
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
