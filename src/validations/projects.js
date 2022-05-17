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
      msg: 'There was an error',
      error: validation.error.details[0].message,
    });
  }
  return next();
};
export default {
  validateCreate,
};
