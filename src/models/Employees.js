const Joi = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: Joi.string().required().min(3),
  lastName: Joi.string().required().min(3),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().password().required().min(6),
  dni: Joi.number().required().min(7).max(8),
  address: Joi.string().alphanum().required().min(3),
  city: Joi.string().required().min(3),
  zip: Joi.number().required().min(4).max(4),
  status: Joi.boolean().required(),
  rol: Joi.string().required,
  projects: Joi.object().required(),
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
