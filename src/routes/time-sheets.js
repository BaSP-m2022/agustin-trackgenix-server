import express from 'express';
import timesheetController from '../controllers/time-sheets';

const router = express.Router();

router
  .get('/', timesheetController.listTimesheets)
  .get('/:id', timesheetController.getById)
  .post('/', timesheetController.createTimesheet)
  .delete('/:id', timesheetController.deleteTimesheet)
  .put('/:id', timesheetController.updateTimesheet);

export default router;
