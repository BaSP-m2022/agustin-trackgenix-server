const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(employees);
});

router.get('/getById/:id', (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find((e) => e.id === employeeId);
  if (employee) {
    res.send(employee);
  } else {
    res.send('Employee not found');
  }
});

router.delete('/delete/:id', (req, res) => {
  const deleteId = req.params.id;
  const listEmployee = employees.filter((e) => e.id !== deleteId);
  if (employees.length === listEmployee.length) {
    res.send('Id not found');
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(listEmployee), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee deleted!');
      }
    });
  }
});

module.exports = router;
