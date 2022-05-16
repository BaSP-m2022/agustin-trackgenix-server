import express from 'express';
import adminsController from '../controllers/admins';

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .post('/', adminsController.createAdmin)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', adminsController.updateAdmin)
  .delete('/:id', adminsController.deleteAdmin);
export default router;
