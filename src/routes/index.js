import express from 'express';
import projectsRoutes from './projects';

const router = express.Router();

router.use('/projects', projectsRoutes);

export default router;
