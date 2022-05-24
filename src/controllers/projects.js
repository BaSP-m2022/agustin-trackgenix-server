import Projects from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find(req.query);
    if (projects.length < 1) {
      return res.status(404).json({
        message: 'Projects has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'success',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      data: error.message,
      error: true,
    });
  }
};
const createProject = (req, res) => {
  const project = new Projects({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    client: req.body.client,
    employees: req.body.employees,
    tasks: req.body.tasks,
    timesheet: req.body.timesheet,
    rates: req.body.rates,
  });
  project.save((error, newProject) => {
    if (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Project created',
      data: newProject,
      error: false,
    });
  });
};

const getProjectById = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const project = await Projects.findById(req.params.id);
      if (!project) {
        return res.status(404).json({
          message: `Project with id: ${req.params.id} has not been found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'success',
        data: project,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'ID format is not valid',
      data: req.params.id,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      data: error.message,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await Projects.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!result) {
        return res.status(404).json({
          message: 'The project has not been found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'The project was successfully updated',
        data: result,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'ID format is not valid',
      data: req.params.id,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      data: error.message,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await Projects.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({
          message: `Id ${req.params.id} does not exist`,
          data: undefined,
          error: true,
        });
      }
      return res.status(204).json({
        message: 'The project was successfully deleted',
        data: result,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'ID format is not valid',
      data: req.params.id,
      error: true,
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
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
};
