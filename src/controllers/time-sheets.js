const express = require('express');
const fileSystem = require('fs');

// DELETE THIS AFTER MONGOOSE IS IMPLEMENTED
const timeSheets = [];

const router = express.Router();
// -------------Get methods
router.get('/getAll', (req, res) => {
  res.send(timeSheets);
});
router.get('/getById/:id', (req, res) => {
  const timeSheetsId = req.params.id;
  const timeSheet = timeSheets.find((ts) => ts.id === timeSheetsId);
  if (timeSheet) {
    res.send(timeSheet);
  } else {
    res.send('Get error: Timesheet not found');
  }
});
// -------------Filter method
router.get('/getByDate', (req, res) => {
  const timeSheetsDate = req.query.date;
  const filteredTimesheet = timeSheets.filter((ts) => ts.date === timeSheetsDate);
  if (filteredTimesheet.length > 0) {
    res.send(filteredTimesheet);
  } else {
    res.send(`The requested timesheet "${timeSheetsDate}" does not exist`);
  }
});
// -------------Post method
router.post('/add', (req, res) => {
  const timeSheetData = req.body;
  if (timeSheetData.id && timeSheetData.proyectId && timeSheetData.employeeId
    && timeSheetData.date && timeSheetData.startTime && timeSheetData.endTime
    && timeSheetData.regularHours && timeSheetData.overtimeHours && timeSheetData.task) {
    timeSheets.push(timeSheetData);
    fileSystem.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Timesheet registered\n ${JSON.stringify(timeSheetData)}`);
      }
    });
  } else {
    res.send('Post error: data incomplete');
  }
});
// -------------Delete method
router.delete('/deleteById/:id', (req, res) => {
  const timeSheetsId = req.params.id;
  const filteredTimesheet = timeSheets.filter((ts) => ts.id !== timeSheetsId);
  if (timeSheets.length === filteredTimesheet.length) {
    res.send('Delete error: Timesheet not found');
  } else {
    fileSystem.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimesheet), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Timesheet deleted');
      }
    });
  }
});
// -------------Put method
router.put('/putById/:id', (req, res) => {
  const timeSheetsId = req.params.id;
  const {
    proyectId, employeeId, date, startTime, endTime, regularHours, overtimeHours, task,
  } = req.body;
  const updatedTimesheet = {
    id: timeSheetsId,
    proyectId: proyectId || '',
    employeeId: employeeId || '',
    date: date || '',
    startTime: startTime || '',
    endTime: endTime || '',
    regularHours: regularHours || '',
    overtimeHours: overtimeHours || '',
    task: task || '',
  };
  const timeSheetIndex = timeSheets.findIndex((ts) => ts.id === timeSheetsId);
  if (timeSheetIndex !== -1) {
    timeSheets[timeSheetIndex] = updatedTimesheet;
    fileSystem.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Timesheet modified\n ${JSON.stringify(updatedTimesheet)}`);
      }
    });
  } else {
    res.send('Modify error: Timesheet not found');
  }
});
module.exports = router;
