const fs = require('fs');
const projects = require('../data/projects.json');

function getAll(req, res) {
  res.status(200).json(projects);
}

function getById(req, res) {
  const { id } = req.params;
  const project = projects.find((proj) => proj.id === parseInt(id, 10));
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

function create(req, res) {
  const {
    id, name, description, status, exployees, tasks, timesheet, rates,
  } = req.body;

  if (id && name && description && status && exployees && tasks && timesheet && rates) {
    const newProject = {
      id: parseInt(id, 10),
      name: name || '',
      description: description || '',
      status: status || '',
      exployees: exployees || '',
      tasks: tasks || '',
      timesheet: timesheet || '',
      rates: rates || '',
    };
    projects.push(newProject);

    fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(404).json({ msg: err });
      } else {
        res.status(201).json({ msg: 'Project created', newProject });
      }
    });
  } else {
    res.status(404).json({ msg: 'Data missing' });
  }
}

function putById(req, res) {
  const { id } = req.params;
  const {
    name, description, status, exployees, tasks, timesheet, rates,
  } = req.body;

  const updatedProject = {
    id: parseInt(id, 10),
    name: name || '',
    description: description || '',
    status: status || '',
    exployees: exployees || '',
    tasks: tasks || '',
    timesheet: timesheet || '',
    rates: rates || '',
  };

  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));
  if (projectIndex !== -1) {
    projects[projectIndex] = updatedProject;

    fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(404).json({ msg: err });
      } else {
        res.status(200).json({ msg: 'Project updated', updatedProject });
      }
    });
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  putById,
};
