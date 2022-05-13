//      Variables      //
const fs = require('fs');

// DELETE THIS AFTER MONGOOSE IS IMPLEMENTED
const superAdmins = [];

//      Get All Super-Admins      //
function getAll(req, res) {
  res.status(200).json(superAdmins);
}

//      Get Super-Admins by ID      //
function getById(req, res) {
  const { id } = req.params;
  const superAdmin = superAdmins.find((proj) => proj.id === parseInt(id, 10));
  if (superAdmin) {
    res.status(200).json(superAdmin);
  } else {
    res.status(404).json({ msg: 'Super Admin not found' });
  }
}

//      Get Super-Admins by Status      //
function getByStatus(req, res) {
  const { status } = req.params;
  const superAdminsFilter = superAdmins.filter((supad) => supad.status.toString() === status);

  if (superAdminsFilter) {
    res.status(200).json(superAdminsFilter);
  } else {
    res.status(404).json({ msg: 'Super Admin not found' });
  }
}

//      Get Super-Admins by Name      //
function getByName(req, res) {
  const { name } = req.params;
  const superAdminsFilter = superAdmins.filter((supad) => supad.name === name);

  if (superAdminsFilter) {
    res.status(200).json(superAdminsFilter);
  } else {
    res.status(404).json({ msg: 'Super Admin not found' });
  }
}

//      Get Super-Admins by Last Name      //
function getByLastName(req, res) {
  const { lastName } = req.params;
  const superAdminsFilter = superAdmins.filter((supad) => supad.lastName === lastName);

  if (superAdminsFilter) {
    res.status(200).json(superAdminsFilter);
  } else {
    res.status(404).json({ msg: 'Super Admin not found' });
  }
}

//      Get Super-Admins by E-Mail      //
function getByEmail(req, res) {
  const { email } = req.params;
  const superAdminsFilter = superAdmins.filter((supad) => supad.email === email);

  if (superAdminsFilter) {
    res.status(200).json(superAdminsFilter);
  } else {
    res.status(404).json({ msg: 'Super Admin not found' });
  }
}

//      Get Super-Admins by Password      //
function getByPassword(req, res) {
  const { password } = req.params;
  const superAdminsFilter = superAdmins.filter((supad) => supad.password === password);

  if (superAdminsFilter) {
    res.status(200).json(superAdminsFilter);
  } else {
    res.status(404).json({ msg: 'Super Admin not found' });
  }
}

//      Create a Super-Admin      //
function create(req, res) {
  const {
    id, name, lastName, email, password, status,
  } = req.body;

  if (id && name && lastName && email && password && status) {
    const newSuperAdmin = {
      id: parseInt(id, 10),
      name: name || '',
      lastName: lastName || '',
      email: email || '',
      password: password || '',
      status: status || '',
    };
    superAdmins.push(newSuperAdmin);

    fs.writeFile('./src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
      if (err) {
        res.status(404).json({ msg: err });
      } else {
        res.status(201).json({ msg: 'Super Admin created', newSuperAdmin });
      }
    });
  } else {
    res.status(404).json({ msg: 'Data missing' });
  }
}

//      Edit a Super-Admin      //
function putById(req, res) {
  const { id } = req.params;
  const {
    name, lastName, email, password, status,
  } = req.body;
  const updatedSuperAdmin = {
    id: parseInt(id, 10),
    name: name || '',
    lastName: lastName || '',
    email: email || '',
    password: password || '',
    status: status || '',
  };
  const superAdminIndex = superAdmins.findIndex((proj) => proj.id === parseInt(id, 10));
  if (superAdminIndex !== -1) {
    superAdmins[superAdminIndex] = updatedSuperAdmin;
    fs.writeFileSync('./src/data/super-admins.json', JSON.stringify(superAdmins));
    res.status(200).json({ msg: 'Super Admin updated', updatedSuperAdmin });
  } else {
    res.status(404).json({ msg: 'Super Admin not found' });
  }
}

//      Delete a Super-Admin      //
function deleteById(req, res) {
  const { id } = req.params;
  const superAdminIndex = superAdmins.findIndex((proj) => proj.id === parseInt(id, 10));
  if (superAdminIndex !== -1) {
    superAdmins.splice(superAdminIndex, 1);
    fs.writeFileSync('./src/data/super-admins.json', JSON.stringify(superAdmins));
    res.status(200).json({ msg: 'Super Admin deleted', superAdmins });
  } else {
    res.status(404).json({ msg: 'Super Admin not found' });
  }
}

//      Export      //
module.exports = {
  getAll,
  getById,
  getByStatus,
  getByName,
  getByLastName,
  getByEmail,
  getByPassword,
  create,
  putById,
  deleteById,
};
