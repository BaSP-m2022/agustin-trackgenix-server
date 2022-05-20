import express from 'express';

import tasksRoutes from './tasks';
import superAdminRoutes from './super-admins';
import adminRoutes from './admins';
import projectRoutes from './projects';
import timesheetRoutes from './time-sheets';
import employeeRoutes from './employees';

const router = express.Router();

router.use('/tasks', tasksRoutes);
router.use('/admins', adminRoutes);
router.use('/projects', projectRoutes);
router.use('/time-sheets', timesheetRoutes);
router.use('/super-admins', superAdminRoutes);
router.use('/employees', employeeRoutes);

export default router;
