//      Imports     //
import express from 'express';
import employeeRoutes from './employees';

//      Employee Router     //
const router = express.Router();

router.use('/employees', employeeRoutes);

//      Export     //
export default router;
