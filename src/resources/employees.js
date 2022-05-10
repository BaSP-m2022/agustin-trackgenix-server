const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/getByRole', (req, res) => {
  const inputRole = req.query.rol;
  const listRole = employees.filter((employee) => employee.rol === inputRole);
  if (listRole.length > 0) {
    res.send(listRole);
  } else {
    res.send('Role not found');
  }
});
router.get('/status/:status', (req, res) => {
  const { status } = req.params;
  const employeesFiltered = employees.filter((emp) => emp.status.toString() === status);
  if (employeesFiltered) {
    res.status(200).json(employeesFiltered);
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
});

router.get('/projects/:project', (req, res) => {
  const { project } = req.params;
  const listProject = [];
  employees.forEach((emp) => emp.projects.forEach((pro) => {
    if (pro.name === project) {
      listProject.push(emp);
    }
  }));
  if (listProject.length > 0) {
    res.status(200).json(listProject);
  } else {
    res.status(404).json({ msg: 'Employees not found' });
  }
});

router.post('/add', (req, res) => {
  const newId = req.body.id;
  const exist = employees.some((e) => e.id === newId);
  if (exist) {
    res.send('an employee with that ID cannot be added because it already exists');
  } else {
    const employeeData = req.body;
    employees.push(employeeData);
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee created!');
      }
    });
  }
});
router.put('/update/:id', (req, res) => {
  const exist = employees.some((e) => e.id === req.params.id);
  if (exist) {
    const employeeFiltered = employees.filter((employee) => employee.id !== req.params.id);
    const employeeNewData = req.body;
    employeeFiltered.push(employeeNewData);
    fs.writeFile('src/data/employees.json', JSON.stringify(employeeFiltered), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee updates succesfully');
      }
    });
  } else {
    res.send('There is no employee with that id');
  }
});
module.exports = router;
