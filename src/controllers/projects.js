import models from '../models/Projects';

// DELETE THIS AFTER MONGOOSE IS IMPLEMENTED
const projects = [];

// const getAllProjects = async (req, res) => {
//   try {
//     const allProjects = await models.Project.find(());
//     return res.status(200).json(allProjects);
//   } catch (error) {
//     res.status(500).json({
//       msg: 'There was an error',
//     });
//   }
// };
const getAllProjects = async (req, res) => {
  try {
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      msg: 'error',
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = new models.Project({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      employees: req.body.employees,
      tasks: req.body.tasks,
      timesheet: req.body.timesheet,
      rates: req.body.rates,
    });
    const result = await project.save();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    console.log(req.body.name);
    console.log(req.body.employees);
    return res.json({
      msg: 'an error has ocurred',
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await models.Project.findById(req.params.id);
      return res.status(200).json(project);
    }
    return res.status(400).json({
      msg: 'missing parameter',
    });
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing parameter',
      });
    }
    const result = await models.Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'The project has not been found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
      error: error.details[0].message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing parameter',
      });
    }
    const result = await models.Project.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The project has not been found',
      });
    }
    return res.status(200).json({
      msg: 'The project has been successfully deleted',
    });
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
    });
  }
};

export default {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
};
