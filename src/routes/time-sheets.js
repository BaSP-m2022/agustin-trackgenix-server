import express from 'express';
import timesheetController from '../controllers/time-sheets';
import timesheetValidation from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', timesheetController.listTimesheets)
  .get('/:id', timesheetController.getById)
  .post('/', timesheetValidation.validateCreate, timesheetController.createTimesheet)
  .delete('/:id', timesheetController.deleteTimesheet)
  .put('/:id', timesheetValidation.validateUpdate, timesheetController.updateTimesheet);

export default router;
