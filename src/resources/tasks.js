// use "import" to import libraries
const express = require('express');

const routerTasks = express.Router();

// use "require" to import JSON files

const tasks = require('../data/tasks.json');

// Gets all tasks
routerTasks.get('/', (req, res) => {
  res.status(200).json({
    data: tasks,
  });
});

// Get single task
routerTasks.get('/:id', (req, res) => {
  const found = tasks.some((task) => task.id === parseInt(req.params.id, 10));
  if (found) {
    res.json(tasks.filter((task) => task.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: `No task found with the id of ${req.params.id}` });
  }
});

// Create a task
/* routerTasks.post('/', (req, res) => {
  const newTask = {

  };
}); */
module.exports = routerTasks;
