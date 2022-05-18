import SuperAdmins from '../models/Super-Admins';

const getSuperAdmins = async (req, res) => {
  try {
    const allSuperAdmins = await SuperAdmins.find(req.query);
    if (allSuperAdmins.length < 1 && Object.keys(req.query).length === 0) {
      return res.status(404).json({
        message: 'There is not any Super Admin registry currently in the database.',
        data: undefined,
        error: true,
      });
    }
    if (allSuperAdmins.length < 1 && Object.keys(req.query).length > 0) {
      return res.status(404).json({
        message: `There is not any result matching the query "${JSON.stringify(req.query)}" from
          the Super Admin registry currently in the database.`,
        data: undefined,
        error: true,
      });
    }
    if (allSuperAdmins.length >= 1 && Object.keys(req.query).length > 0) {
      return res.status(200).json({
        message: `The Super Admin/s matching the query "${JSON.stringify(req.query)}" from the
          Super Admin registry currently in the database is/are:`,
        data: allSuperAdmins,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'The current Super Admin registry is:',
      data: allSuperAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error:',
      data: error.message,
      error: true,
    });
  }
};

const getSuperAdminById = async (req, res) => {
  try {
    const superAdmin = await SuperAdmins.findById(req.params.id);
    if (!superAdmin) {
      return res.status(404).json({
        message: `There is not any Super Admin matching the id "${JSON.stringify(req.params.id)}"
            from the Super Admin registry currently in the database.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `The Super Admin matching the id "${JSON.stringify(req.params.id)}" from the
            Super Admin registry currently in the database is:`,
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error:',
      data: error.message,
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmins({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status,
    });
    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'A new Super Admin has been created!',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred during creating the new resource:',
      data: error.message,
      error: true,
    });
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    const updated = await SuperAdmins.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    return res.status(200).json({
      message: 'Super Admin succesfully updated!',
      data: updated,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred during updating the resource:',
      data: error.message,
      error: true,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const deleted = await SuperAdmins.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: `There is no Super Admin with matching id: ${req.params.id}.`,
        data: undefined,
        error: false,
      });
    }
    return res.status(204).json({
      message: `The Super Admin with with id: ${req.params.id} has been deleted from the database.`,
      data: deleted,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred during deleting the resource:',
      data: error.message,
      error: true,
    });
  }
};

export default {
  getSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
