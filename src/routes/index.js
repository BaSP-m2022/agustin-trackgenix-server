import express from 'express';
import employeeRoutes from './employees';

const router = express.Router();

router.use('/employees', employeeRoutes);

export default router;
