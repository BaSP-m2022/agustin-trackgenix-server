const projects = require('../data/projects.json');

function getAll(req, res) {
  res.status(200).json(projects);
}

function getById(req, res) {
  const { id } = req.params;
  const project = projects.find((proj) => proj.id === parseInt(id, 10));
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

module.exports = {
  getAll,
  getById,
};
