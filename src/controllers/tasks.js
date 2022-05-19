import Tasks from '../models/Tasks';

const createTask = (req, res) => {
  const task = new Tasks({
    name: req.body.name,
    details: req.body.details,
  });
  task.save((error, newTask) => {
    if (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Success',
      data: newTask,
      error: false,
    });
  });
};

const readTask = (req, res) => {
  Tasks.find(req.query)
    .then((tasks) => res.status(200).json({
      message: 'Success',
      data: tasks,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    }));
};

const readTaskById = (req, res) => {
  Tasks.findById(req.params.id, (error, taskToFind) => {
    if (!taskToFind) {
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
    return res.status(200).json({
      message: 'Success',
      data: taskToFind,
      error: false,
    });
  });
};

const updateTask = (req, res) => {
  Tasks.findByIdAndUpdate(req.params.id, req.body, (error, newTask) => {
    if (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Success',
      data: newTask,
      error: false,
    });
  });
};

const deleteTask = (req, res) => {
  Tasks.findByIdAndDelete(req.params.id, (error, taskToDelete) => {
    if (!taskToDelete) {
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
      message: 'Task deleted',
      data: taskToDelete,
      error: false,
    });
  });
};

export default {
  createTask,
  readTask,
  readTaskById,
  updateTask,
  deleteTask,
};
