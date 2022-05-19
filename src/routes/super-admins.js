import express from 'express';
import superAdminController from '../controllers/super-admins';
import superAdminValidation from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminController.getSuperAdmins)
  .get('/:id', superAdminController.getSuperAdminById)
  .post('/', superAdminValidation.createValidation, superAdminController.createSuperAdmin)
  .put('/:id', superAdminValidation.updateValidation, superAdminController.updateSuperAdmin)
  .delete('/:id', superAdminController.deleteSuperAdmin);

export default router;
