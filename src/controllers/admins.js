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
    return res.json({
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
    return res.json({
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
    return res.json({
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

// DELETE THIS AFTER MONGOOSE IS IMPLEMENTED
// const admins = [];

// const getAdmin = (req, resp) => {
//   const adminId = parseInt(req.params.id, 10);
//   // eslint-disable-next-line no-shadow
//   const admin = admins.find((admin) => admin.id === adminId);
//   if (admin) {
//     resp.send(admin);
//   } else {
//     resp.send(`Admin with id ${adminId} does not exist`);
//   }
// };

// const getStatus = (req, resp) => {
//   const adminFiltered = admins.filter((admin) => admin.status === req.query.status);
//   if (adminFiltered.length > 0) {
//     resp.send(adminFiltered);
//   } else {
//     resp.send(`Admin with ${req.query.status} status was not found`);
//   }
// };

// const addAdmin = (req, resp) => {
//   const adminData = req.body;
//   if (adminData.id && adminData.name && adminData.lastName && adminData.email
//     && adminData.password && adminData.status) {
//     admins.push(adminData);
//     fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
//       if (err) {
//         resp.send(err);
//       } else {
//         resp.send('Admin created');
//       }
//     });
//   } else {
//     resp.send('Please, check the data entered is correct. The Admin must have an id
// , name, last name, email, password and status (Active or Unavailable).');
//   }
// };

// const deleteAdmin = (req, resp) => {
//   const adminFilter = admins.filter((admin) => admin.id !== parseInt(req.params.id, 10));
//   if (adminFilter.length !== admins.length) {
//     fs.writeFile('src/data/admins.json', JSON.stringify(adminFilter), (err) => {
//       if (err) {
//         resp.send(err);
//       } else {
//         resp.send(`Admin with id ${req.params.id} was succesfully deleted`);
//       }
//     });
//   } else {
//     resp.send(`There is no admin with ${req.params.id} id`);
//   }
// };

// const updateAdmin = (req, resp) => {
//   const { id } = req.params;
//   const {
//     name, lastName, email, password, status,
//   } = req.body;
//   const adminUpdated = {
//     id: parseInt(id, 10),
//     name: name || '',
//     lastName: lastName || '',
//     email: email || '',
//     password: password || '',
//     status: status || '',
//   };
//   const adminIndex = admins.findIndex((admin) => admin.id === parseInt(id, 10));
//   if (adminIndex !== -1) {
//     admins[adminIndex] = adminUpdated;
//     fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
//       if (err) {
//         resp.send(err);
//       } else {
//         resp.send('The Admin was succesfully updated');
//       }
//     });
//   } else {
//     resp.send('The Admin was not found');
//   }
// };
