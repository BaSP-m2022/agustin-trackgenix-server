import express from 'express';
import projectRoutes from './projects';
import timesheetRoutes from './time-sheets';

const router = express.Router();

router.use('/projects', projectRoutes);
router.use('/time-sheets', timesheetRoutes);

export default router;
