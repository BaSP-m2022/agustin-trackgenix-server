import TimeSheets from '../models/Time-Sheets';

// -------------list
const listTimesheets = (req, res) => {
  TimeSheets.find(req.query)
    .then((timesheet) => res.status(200).json({
      message: 'succes list',
      data: timesheet,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    }));
};

// -------------create
const createTimesheet = (req, res) => {
  const timesheet = new TimeSheets({
    date: req.body.date,
    regularHours: req.body.regularHours,
    overtimeHours: req.body.overtimeHours,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  timesheet.save((error, newTimesheet) => {
    if (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'succes create',
      data: newTimesheet,
      error: false,
    });
  });
};

// -------------delete
const deleteTimesheet = (req, res) => {
  TimeSheets.findByIdAndDelete(req.params.id, (error, chosenTimesheet) => {
    if (!chosenTimesheet) {
      return res.status(404).json({
        message: `Id ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    if (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json({
      message: 'time-sheet deleted',
      data: chosenTimesheet,
      error: false,
    });
  });
};

// -------------update
const updateTimesheet = (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({
      message: 'ID is required',
      data: undefined,
      error: true,
    });
  }
  const timesheet = new TimeSheets({
    date: req.body.date,
    regularHours: req.body.regularHours,
    overtimeHours: req.body.overtimeHours,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });
  TimeSheets.findByIdAndUpdate(req.params.id, timesheet, (error, newTimesheet) => {
    if (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'time-sheet updated',
      data: newTimesheet,
      error: false,
    });
  });
  return res.status(400).json({
    message: 'error',
    data: undefined,
    error: true,
  });
};

export default {
  listTimesheets,
  createTimesheet,
  deleteTimesheet,
  updateTimesheet,
};
