import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const projectSchema = Joi.object().keys({
    name: Joi.string().min(4).max(50).required(),
    description: Joi.string().lowercase().required(),
  });

  const employeeValidation = Joi.object({
    name: Joi.string().optional().min(3).max(30),
    lastName: Joi.string().optional().min(3).max(30),
    email: Joi.string().email().lowercase().optional(),
    password: Joi.string().optional().alphanum().min(6)
      .max(30),
    dni: Joi.string().optional().min(7).max(8)
      .max(30),
    address: Joi.string().alphanum().optional().min(3)
      .max(30),
    city: Joi.string().optional().min(3).max(30),
    zip: Joi.string().optional().min(4).max(4)
      .max(30),
    status: Joi.boolean().optional(),
    role: Joi.string().valid('DEV', 'QA', 'PM').required(),
    project: Joi.array().items(projectSchema),
  });

  const validate = employeeValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'There was an error with the validation',
      data: validate.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const projectSchema = Joi.object({
    name: Joi.string().min(4).max(30).optional(),
    description: Joi.string().lowercase().optional(),
  }).optional();

  const employeeValidation = Joi.object({
    name: Joi.string().required().min(3).max(30),
    lastName: Joi.string().optional().min(3).max(30),
    email: Joi.string().email().lowercase().optional(),
    password: Joi.string().optional().alphanum().min(6)
      .max(30),
    dni: Joi.string().optional().min(7).max(8)
      .max(30),
    address: Joi.string().alphanum().optional().min(3)
      .max(30),
    city: Joi.string().optional().min(3).max(30),
    zip: Joi.string().optional().min(4).max(4)
      .max(30),
    status: Joi.boolean().optional(),
    role: Joi.string().valid('DEV', 'QA', 'PM').required(),
    project: projectSchema,
  });

  const validate = employeeValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'There was an error with the validation',
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
