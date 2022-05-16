import express from 'express';
import superAdminsController from '../controllers/super-admins';
/* import superAdminsValidation from '../validations/super-admins'; */

const router = express.Router();

router
  .get('/', superAdminsController.getAllSuperAdmins);
/*   .get('/', superAdminsController.getSuperAdminById)
  .post('/', superAdminsValidation.superAdminValidation, superAdminsController.createSuperAdmin)
  .put('/:id', superAdminsValidation.superAdminValidation, superAdminsController.updateSuperAdmin)
  .delete('/:id', superAdminsController.deleteSuperAdmin); */

export default router;
