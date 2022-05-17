import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validations/employees';

const router = express.Router();

router
  .get('/', employeeController.listEmployees)
  .get('/:id', employeeController.getById)
  .post('/', employeeValidation.validateCreate, employeeController.createEmployee)
  .delete('/:id', employeeController.deleteEmployee)
  .put('/:id', employeeValidation.validateUpdate, employeeController.updateEmployee);

export default router;
