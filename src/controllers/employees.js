//      Variable Employees     //
import Employees from '../models/Employees';

//      Get list of Employees     //
const listEmployees = (req, res) => {
  Employees.find(req.query)
    .then((employee) => res.status(200).json({
      message: 'Employees listed successfully',
      data: employee,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    }));
};

//      Get Employees by ID     //
const getById = async (req, res) => {
  try {
    const result = await Employees.findById(req.params.id);
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

//      Delete Employees     //
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

//      Create Employees     //
const createEmployee = async (req, res) => {
  const { project } = req.body;
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
      project,
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

//      Update Employees     //
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

//      Exports     //
export default {
  listEmployees,
  getById,
  deleteEmployee,
  createEmployee,
  updateEmployee,
};
