import Joi from 'joi';

/* const superAdminJoiSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().alphanum().min(8).required(),
  status: Joi.boolean().required(),
}); */

const createValidation = (req, res, next) => {
  const superAdminJoiSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().alphanum().min(8).required(),
    status: Joi.boolean().required(),
  });
  const validation = superAdminJoiSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the request validation:',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default {
  createValidation,
};
