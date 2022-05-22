import Employees from '../models/Employees';

const listEmployees = async (req, res) => {
  try {
    const list = await Employees.find(req.query).populate('projects');
    res.status(200).json({
      message: 'Employees listed successfully',
      data: list,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getById = async (req, res) => {
  try {
    const result = await Employees.findById(req.params.id).populate('projects');
    if (!result) {
      return res.status(404).json({
        message: `Id ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'success',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const result = await Employees.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `Id ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee deleted successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dni: req.body.dni,
      address: req.body.address,
      city: req.body.city,
      zip: req.body.zip,
      status: true,
      role: req.body.role,
      projects: req.body.projects,
    });
    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const result = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `Id ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee updated successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      data: error.message,
      error: true,
    });
  }
};

export default {
  listEmployees,
  getById,
  deleteEmployee,
  createEmployee,
  updateEmployee,
};
