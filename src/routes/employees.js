//      Imports     //
import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validations/employees';

const router = express.Router();

//      Employee Routers     //
router
  .get('/', employeeController.listEmployees)
  .get('/:id', employeeController.getById)
  .post('/', employeeController.createEmployee)
  .delete('/:id', employeeController.deleteEmployee)
  .put('/:id', employeeValidation.validateUpdate, employeeController.updateEmployee);

//      Export     //
export default router;
