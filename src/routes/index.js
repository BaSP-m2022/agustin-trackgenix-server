import express from 'express';
import tasksRoutes from './tasks';
import projectRoutes from './projects';

const router = express.Router();

router.use('/tasks', tasksRoutes);
router.use('/projects', projectRoutes);

export default router;
