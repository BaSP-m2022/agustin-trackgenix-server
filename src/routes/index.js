import express from 'express';
import adminRoutes from './admins';
import projectRoutes from './projects';

const router = express.Router();
router.use('/admins', adminRoutes);
router.use('/projects', projectRoutes);

export default router;
