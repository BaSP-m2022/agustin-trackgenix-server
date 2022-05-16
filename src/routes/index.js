import express from 'express';
import adminRoutes from './admins';

const router = express.Router();
router.use('/admins', adminRoutes);

export default router;
