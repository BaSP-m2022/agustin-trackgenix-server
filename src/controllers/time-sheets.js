import TimeSheets from '../models/Time-Sheets';

// -------------list
const listTimesheets = (req, res) => {
  TimeSheets.find(req.query)
    .then((timesheet) => res.status(200).json({
      message: 'The time-sheet listed successfully',
      data: timesheet,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    }));
};

// -------------Get by ID
const getById = async (req, res) => {
  try {
    const result = await TimeSheets.findById(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `Id ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'success',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// -------------create
const createTimesheet = async (req, res) => {
  try {
    const timesheet = new TimeSheets({
      date: req.body.date,
      regularHours: req.body.regularHours,
      overtimeHours: req.body.overtimeHours,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      task: req.body.task,
      employee: {
        name: req.body.employee.name,
        lastName: req.body.employee.lastName,
        role: req.body.employee.role,
      },
      project: {
        name: req.body.project.name,
        description: req.body.project.description,
      },
    });
    const result = await timesheet.save();
    return res.status(201).json({
      message: 'The time-sheet created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// -------------delete
const deleteTimesheet = async (req, res) => {
  try {
    const result = await TimeSheets.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `Id ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The time-sheet deleted successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// -------------update
const updateTimesheet = async (req, res) => {
  try {
    const result = await TimeSheets.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `Id ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The time-sheet updated successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      data: error.message,
      error: true,
    });
  }
};

export default {
  listTimesheets,
  getById,
  createTimesheet,
  deleteTimesheet,
  updateTimesheet,
};
