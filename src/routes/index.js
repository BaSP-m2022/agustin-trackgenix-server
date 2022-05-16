import express from 'express';
import tasksRoutes from './tasks';

const router = express.Router();

router.use('/tasks', tasksRoutes);

export default router;
