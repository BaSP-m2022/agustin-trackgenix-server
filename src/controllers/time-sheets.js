import TimeSheets from '../models/Time-Sheets';

const listTimesheets = async (req, res) => {
  try {
    const data = await TimeSheets.find(req.query)
      .populate('task')
      .populate('employee')
      .populate('project');

    return res.status(200).json({
      status: 'success',
      data,
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

const getById = async (req, res) => {
  try {
    const result = await TimeSheets.findById(req.params.id)
      .populate('task')
      .populate('employee')
      .populate('project');

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
    return res.status(204).json({
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
