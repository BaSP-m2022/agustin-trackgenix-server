import express from 'express';
import tasksValidation from '../validations/tasks';
import tasksController from '../controllers/tasks';

const router = express.Router();

router
  .get('/', tasksController.readTask)
  .get('/:id', tasksController.readTaskById)
  .post('/', tasksValidation.validateTaskCreationAndModify, tasksController.createTask)
  .put('/:id', tasksController.updateTask)
  .delete('/:id', tasksController.deleteTask);

export default router;
