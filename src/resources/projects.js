const projects = require('../data/projects.json');

function getAll(req, res) {
  res.status(200).json(projects);
}

module.exports = {
  getAll,
};
