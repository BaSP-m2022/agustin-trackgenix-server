import Admins from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);
    if (admins.length < 1) {
      return res.status(404).json({
        message: 'Admins has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'success',
      data: admins,
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
const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        message: `Admin with id: ${req.params.id} has not been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'success',
      data: admin,
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

const createAdmin = (req, res) => {
  const admin = new Admins({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    status: req.body.status,
  });
  admin.save((error, newAdmin) => {
    if (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Admin created!',
      data: newAdmin,
      error: false,
    });
  });
};

const updateAdmin = async (req, res) => {
  try {
    const result = await Admins.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Admin has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin updated successfully',
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

const deleteAdmin = async (req, res) => {
  try {
    const result = await Admins.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `Id ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin deleted successfully',
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
  getAdminById,
  createAdmin,
  deleteAdmin,
  updateAdmin,
  getAllAdmins,
};
