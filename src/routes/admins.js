import express from 'express';
import adminsController from '../controllers/admins';
import validations from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .post('/', validations.validateCreate, adminsController.createAdmin)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', validations.validateUpdate, adminsController.updateAdmin)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
