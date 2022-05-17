import express from 'express';
import projectsController from '../controllers/projects';
import projectsValidation from '../validations/projects';

const router = express.Router();

router
  .get('/', projectsController.getAllProjects)
  .post('/', projectsValidation.validateCreate, projectsController.createProject)
  .get('/:id', projectsController.getProjectById)
  .put('/:id', projectsValidation.validateUpdate, projectsController.updateProject)
  .delete('/:id', projectsController.deleteProject);
export default router;
