import express from 'express';
import projectsController from '../controllers/projects';
// import projectsValidation from ('../validations/projects');

const router = express.Router();

router
  .get('/a', projectsController.getAllProjects)
  .post('/', projectsController.createProject)
  .get('/:id', projectsController.getProjectById)
  .put('/:id', projectsController.updateProject)
  .delete('/:id', projectsController.deleteProject);
export default router;
