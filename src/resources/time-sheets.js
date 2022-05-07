const express = require('express');
const timeSheets = require('../data/time-sheets.json');

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
    res.send('Timesheet not found');
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
module.exports = router;
