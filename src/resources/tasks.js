/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const fs = require('fs');
const tasks = require('../data/tasks.json');

// Gets all tasks
const getAll = (req, res) => {
  res.status(200).json({
    data: tasks,
  });
};

// Get single task
const getById = (req, res) => {
  const found = tasks.some((task) => task.id === parseInt(req.params.id, 10));
  if (found) {
    res.json(tasks.find((task) => task.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: `No task found with the id of ${req.params.id}` });
  }
};

// Filter by partial name value
const getByFilter = (req, res) => {
  const query = req.query.name;
  const tasksFiltered = tasks.filter((val) => val.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  if (tasksFiltered.length > 0) {
    res.send(tasksFiltered);
  } else {
    res.send(`There are no tasks matching the filter: "${query}"`);
  }
};

// Create a task
const create = (req, res) => {
  const newTask = req.body;
  /*   if (newTask.id && newTask.name && (newTask.details || newTask.details === null)) {

  } */
  tasks.push(newTask);
  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Task succesfully created');
    }
  });
  res.send(tasks);
};

// Edit a task
const updateById = (req, res) => {
  const found = tasks.some((task) => task.id === parseInt(req.params.id, 10));
  if (found) {
    const editTask = req.body;
    tasks.forEach((task) => {
      if (task.id === parseInt(req.params.id, 10)) {
        task.name = editTask.name ? editTask.name : task.name;
        task.details = editTask.details ? editTask.details : task.details;
        res.json({ msg: 'Task updated', task });
      }
    });
  } else {
    res.status(400).json({ msg: `No task found with the id of ${req.params.id}` });
  }
};

// Delete task
const deleteById = (req, res) => {
  /*   const idToDelete = req.params.id; */
  const remainingTasks = tasks.filter((task) => task.id !== parseInt(req.params.id, 10));
  if (tasks.length === remainingTasks.length) {
    res.send(`Could not find the task with id: ${req.params.id}, therefore it cannot be deleted.`);
  } else {
    fs.writeFile('src/data/tasks.json', JSON.stringify(remainingTasks), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Task succesfully deleted!');
      }
    });
  }
};

module.exports = {
  getAll,
  getById,
  updateById,
  deleteById,
  getByFilter,
  create,
};
