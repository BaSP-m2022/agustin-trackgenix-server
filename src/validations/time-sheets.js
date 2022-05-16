import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const employeeSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    lastName: Joi.string().min(4).max(50).required(),
    role: Joi.string().valid('DEV', 'QA', 'PM').required(),
  });

  const projectSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    description: Joi.string().lowercase().required(),
  });

  const timesheetValidation = Joi.object({
    date: Joi.date().max('now').required(),
    regularHours: Joi.number().integer().min(0).max(12)
      .required(),
    overtimeHours: Joi.number().integer().min(0).max(12)
      .required(),
    startTime: Joi.number().integer().min(0).max(2400)
      .required(),
    endTime: Joi.number().integer().min(0).max(2400)
      .required(),
    task: Joi.string().lowercase().min(4).max(50)
      .required(),
    employee: employeeSchema,
    project: projectSchema,
  });

  const validate = timesheetValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'There was an error',
      error: validate.error.details[0].message,
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

  const projectSchema = Joi.object({
    name: Joi.string().min(4).max(50).optional(),
    description: Joi.string().lowercase().optional(),
  });

  const timesheetValidation = Joi.object({
    date: Joi.date().max('now').optional(),
    regularHours: Joi.number().integer().min(0).max(12)
      .optional(),
    overtimeHours: Joi.number().integer().min(0).max(12)
      .optional(),
    startTime: Joi.number().integer().min(0).max(2400)
      .optional(),
    endTime: Joi.number().integer().min(0).max(2400)
      .optional(),
    task: Joi.string().lowercase().min(4).max(50)
      .optional(),
    employee: employeeSchema,
    project: projectSchema,
  });

  const validate = timesheetValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'There was an error',
      error: validate.error.details[0].message,
    });
  }
  return next();
};

export default {
  validateCreate,
  validateUpdate,
};
