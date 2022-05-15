const express = require('express');

const router = express.Router();
const employees = require('../controllers/employees');

router.use('employees', employees);
