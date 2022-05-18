import express from 'express';
import tasksValidation from '../validations/tasks';
import tasksController from '../controllers/tasks';

const router = express.Router();

router
  .get('/', tasksController.readTask)
  .get('/:id', tasksController.readTaskById)
  .post('/', tasksValidation.validateTaskCreation, tasksController.createTask)
  .put('/:id', tasksValidation.validateTaskModify, tasksController.updateTask)
  .delete('/:id', tasksController.deleteTask);

export default router;
