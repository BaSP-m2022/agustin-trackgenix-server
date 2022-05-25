import Joi from 'joi';

const validateCreate = (req, res, next) => {
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
    task: Joi.string().alphanum().length(24).required(),
    employee: Joi.string().alphanum().length(24).required(),
    project: Joi.string().alphanum().length(24).required(),
  });

  const validate = timesheetValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: validate.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
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
    task: Joi.string().alphanum().length(24).optional(),
    employee: Joi.string().alphanum().length(24).optional(),
    project: Joi.string().alphanum().length(24).optional(),
  });

  const validate = timesheetValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: validate.error,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreate,
  validateUpdate,
};
