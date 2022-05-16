//      Import     //
import Joi from 'joi';

//      Create an Employee-Validator     //
const validateCreate = (req, res, next) => {
  const projectSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    description: Joi.string().lowercase().required(),
  });

  const employeeValidation = Joi.object({
    name: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required().min(6),
    dni: Joi.number().required().min(7).max(8),
    address: Joi.string().alphanum().required().min(3),
    city: Joi.string().required().min(3),
    zip: Joi.number().required().min(4).max(4),
    status: Joi.boolean().required(),
    role: Joi.string().required,
    project: projectSchema,
  });

  const validate = employeeValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'There was an error',
      error: validate.error.details[0].message,
    });
  }
  return next();
};

//      Update an Employee-Validator     //
const validateUpdate = (req, res, next) => {
  const projectSchema = Joi.object({
    name: Joi.string().min(4).max(50).optional(),
    description: Joi.string().lowercase().optional(),
  });

  const employeeValidation = Joi.object({
    name: Joi.string().optional().min(3),
    lastName: Joi.string().optional().min(3),
    email: Joi.string().email().lowercase().optional(),
    password: Joi.string().optional().min(6),
    dni: Joi.number().optional().min(7).max(8),
    address: Joi.string().alphanum().optional().min(3),
    city: Joi.string().optional().min(3),
    zip: Joi.number().optional().min(4).max(4),
    status: Joi.boolean().optional(),
    role: Joi.string().optional(),
    project: projectSchema,
  });

  const validate = employeeValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'There was an error',
      error: validate.error.details[0].message,
    });
  }
  return next();
};

//      Exports     //
export default {
  validateCreate,
  validateUpdate,
};
