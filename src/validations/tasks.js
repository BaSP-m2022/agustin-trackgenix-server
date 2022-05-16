const Joi = require('joi');

const validateTaskCreationAndModify = (req, res, next) => {
  const taskValidation = Joi.object({
    name: Joi.string().min(1).max(20).required(),
    details: Joi.string().min(20).max(50).required(),
  });
  const validation = taskValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error while the validation was requested',
      error: validation.error.details[0].message,
    });
  }
  return next();
};
export default {
  validateTaskCreationAndModify,
};
