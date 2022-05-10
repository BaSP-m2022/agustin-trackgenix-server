const fs = require('fs');
const projects = require('../data/projects.json');

function deleteById(req, res) {
  const { id } = req.params;
  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));
  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);
    fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(404).json({ msg: err });
      } else {
        res.status(201).json({ msg: 'Project deleted' });
      }
    });
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

function getByStatus(req, res) {
  const { status } = req.params;
  const projectsFilter = projects.filter((proj) => proj.status.toString() === status);

  if (projectsFilter) {
    res.status(200).json(projectsFilter);
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

function getByName(req, res) {
  const { name } = req.params;
  const projectsFilter = projects.filter((proj) => proj.name === name);

  if (projectsFilter) {
    res.status(200).json(projectsFilter);
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

function addEmployee(req, res) {
  const { idProject } = req.params;
  const {
    idEmployee, name, lastName, rol,
  } = req.body;
  const newEmployee = {
    id: parseInt(idEmployee, 10),
    name: name || '',
    lastName: lastName || '',
    rol: rol || '',
  };
  const project = projects.find((proj) => proj.id === parseInt(idProject, 10));
  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(idProject, 10));
  if (project) {
    project.employees.push(newEmployee);
    projects[projectIndex] = project;
    fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(404).json({ msg: err });
      } else {
        res.status(200).json({ msg: 'Project updated', project });
      }
    });
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

function deleteEmployee(req, res) {
  const { idProject, idEmployee } = req.params;
  const project = projects.find((proj) => proj.id === parseInt(idProject, 10));
  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(idProject, 10));
  const employeeIndex = project.employees.findIndex((emp) => emp.id === parseInt(idEmployee, 10));
  if (projectIndex !== -1 && employeeIndex !== -1) {
    project.employees.splice(employeeIndex, 1);
    projects[projectIndex] = project;
    fs.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
    res.status(200).json({ msg: 'employee deleted', project });
  } else {
    res.status(404).json({ msg: 'Project or employee not found' });
  }
}

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
  deleteEmployee,
  addEmployee,
  getByName,
  getByStatus,
  deleteById,
};
