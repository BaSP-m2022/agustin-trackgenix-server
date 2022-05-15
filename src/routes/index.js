import express from 'express';
import timesheetRoutes from './time-sheets';

const router = express.Router();

router.use('/time-sheets', timesheetRoutes);

export default router;
