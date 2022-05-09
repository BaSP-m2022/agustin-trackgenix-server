/* eslint-disable radix */
/* eslint-disable consistent-return */
const fs = require('fs');
const admins = require('../data/admins.json');

const getAdmin = (req, resp) => {
  const adminId = parseInt(req.params.id);
  // eslint-disable-next-line no-shadow
  const admin = admins.find((admin) => admin.id === adminId);
  if (admin) {
    resp.send(admin);
  } else {
    resp.send(`Admin with id ${adminId} does not exist`);
  }
};

const getStatus = (req, resp) => {
  const adminFiltered = admins.filter((admin) => admin.status === req.query.status);
  if (adminFiltered.length > 0) {
    resp.send(adminFiltered);
  } else {
    resp.send(`Admin with ${req.query.status} status was not found`);
  }
};

const addAdmin = (req, resp) => {
  const adminData = req.body;
  if (adminData.id && adminData.name && adminData.lastName && adminData.email
    && adminData.password && adminData.status) {
    admins.push(adminData);
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
      if (err) {
        resp.send(err);
      } else {
        resp.send('Admin created');
      }
    });
  } else {
    resp.send('Please, check the data entered is correct. The Admin must have an id, name, last name, email, password and status (Active or Unavailable).');
  }
};

const deleteAdmin = (req, resp) => {
  const adminFilter = admins.filter((admin) => admin.id !== parseInt(req.params.id));
  if (adminFilter.length !== admins.length) {
    fs.writeFile('src/data/admins.json', JSON.stringify(adminFilter), (err) => {
      if (err) {
        resp.send(err);
      } else {
        resp.send(`Admin with id ${req.params.id} was succesfully deleted`);
      }
    });
  } else {
    resp.send(`There is no admin with ${req.params.id} id`);
  }
};

const updateAdmin = (req, resp) => {
  const { id } = req.params;
  const {
    name, lastName, email, password, status,
  } = req.body;
  const adminUpdated = {
    id: parseInt(id, 10),
    name: name || '',
    lastName: lastName || '',
    email: email || '',
    password: password || '',
    status: status || '',
  };
  const adminIndex = admins.findIndex((admin) => admin.id === parseInt(id, 10));
  if (adminIndex !== -1) {
    admins[adminIndex] = adminUpdated;
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
      if (err) {
        resp.send(err);
      } else {
        resp.send('The Admin was succesfully updated', adminUpdated);
      }
    });
  } else {
    resp.send('The Admin was not found');
  }
};

module.exports = {
  getAdmin,
  getStatus,
  addAdmin,
  deleteAdmin,
  updateAdmin,
};
