//      Imports     //
import express from 'express';
import employeeController from '../controllers/time-sheets';
import employeeValidation from '../validations/time-sheets';

const router = express.Router();

//      Employee Routers     //
router
  .get('/', employeeController.listEmployees)
  .get('/:id', employeeController.getById)
  .post('/', employeeValidation.validateCreate, employeeController.createEmployee)
  .delete('/:id', employeeController.deleteEmployee)
  .put('/:id', employeeValidation.validateUpdate, employeeController.updateEmployee);

//      Export     //
export default router;
