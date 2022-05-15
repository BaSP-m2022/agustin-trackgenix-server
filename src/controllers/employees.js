const Employees = require('../models/Employees');

const listEmployees = (req, res) => {
  Employees.find(req.query)
    .then((employee) => res.status(200).json(employee))
    .catch((error) => res.status(400).json({ message: error }));
};

const findEmployeeById = (req, res) => {
  Employees.findById(req.params.id, (error, chosenEmployee) => {
    if (!chosenEmployee) {
      return res.status(404).json({ message: 'Employee with that ID does not exist' });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return (employee) => res.status(200).json(employee);
  });
};

const deleteEmployee = (req, res) => {
  Employees.findByIdAndDelete(req.params.id, (error, chosenEmployee) => {
    if (!chosenEmployee) {
      return res.status(404).json({ message: 'Employee with that ID does not exist' });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(204).send();
  });
};

const findEmployeeByRol = (req, res) => {
  Employees.findOne(req.params.rol, (error, chosenEmployee) => {
    if (!chosenEmployee) {
      return res.status(404).json({ message: 'Employee with that Rol does not exist' });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return (employee) => res.status(200).json(employee);
  });
};

const findEmployeesByStatus = (req, res) => {
  Employees.find(req.params.status, (error, chosenEmployee) => {
    if (!chosenEmployee) {
      return res.status(404).json({ message: 'Employees with that Status do not exist' });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return (employee) => res.status(200).json(employee);
  });
};

const findEmployeesByProject = (req, res) => {
  Employees.find(req.params.project, (error, chosenEmployee) => {
    if (!chosenEmployee) {
      return res.status(404).json({ message: 'Employees with that Project do not exist' });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return (employee) => res.status(200).json(employee);
  });
};

const createEmployee = (req, res) => {
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
    rol: req.body.rol,
    projects: req.body.projects,
  });

  employee.save((error, newEmployee) => {
    if (error) {
      return res.status(400).json({ message: error });
    }
    return res.status(201).json(newEmployee);
  });
};

const editEmployee = (req, res) => {
  Employees.findByIdAndUpdate(req.params.id, () => {
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
      rol: req.body.rol,
      projects: req.body.projects,
    });

    employee.save((error, newEmployee) => {
      if (error) {
        return res.status(400).json({ message: error });
      }
      return res.status(201).json(newEmployee);
    });
  }, (error, chosenEmployee) => {
    if (!chosenEmployee) {
      return res.status(404).json({ message: 'Employee with that ID does not exist' });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return (employee) => res.status(200).json(employee);
  });
};
module.exports = {
  listEmployees,
  findEmployeeById,
  deleteEmployee,
  findEmployeeByRol,
  findEmployeesByStatus,
  findEmployeesByProject,
  createEmployee,
  editEmployee,
};
