/* eslint-disable radix */
/* eslint-disable consistent-return */
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

module.exports = {
  getAdmin,
  getStatus,
};
