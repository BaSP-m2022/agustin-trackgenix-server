// use "import" to import libraries
import express from 'express';
import projects from './resources/projects';
import admins from './resources/admins';
import superAdmins from './resources/super-admins';

// import router
const employeesRouter = require('./resources/employees');

const tasks = require('./resources/tasks');
// use "require" to import JSON files
const timeSheetsRouter = require('./resources/time-sheets');

// use "require" to import JSON files
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/time-sheets', timeSheetsRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// tasks router
app.get('/tasks/getAll', tasks.getAll);
app.get('/tasks/getByFilter', tasks.getByFilter);
app.get('/tasks/getById/:id', tasks.getById);
app.post('/tasks/add', tasks.create);
app.put('/tasks/updateById/:id', tasks.updateById);
app.delete('/tasks/deleteById/:id', tasks.deleteById);
// projects router
app.get('/projects', projects.getAll);
app.get('/projects/:id', projects.getById);
app.post('/projects/add', projects.create);
app.delete('/projects/delete/:id', projects.deleteById);
app.get('/projects/filterStatus/:status', projects.getByStatus);
app.get('/projects/filterName/:name', projects.getByName);
app.post('/projects/addEmployee/:idProject', projects.addEmployee);
app.delete('/projects/deleteEmployee/:idProject/:idEmployee', projects.deleteEmployee);
app.put('/projects/update/:id', projects.putById);

// super-admin router
app.get('/super-admins', superAdmins.getAll);
app.get('/super-admins/:id', superAdmins.getById);
app.get('/super-admins/byStatus/:status', superAdmins.getByStatus);
app.get('/super-admins/byName/:name', superAdmins.getByName);
app.get('/super-admins/byEmail/:email', superAdmins.getByEmail);
app.get('/super-admins/byPassword/:password', superAdmins.getByPassword);
app.get('/super-admins/byLastName/:lastName', superAdmins.getByLastName);
app.post('/super-admins/add', superAdmins.create);
app.put('/super-admins/update/:id', superAdmins.putById);
app.delete('/super-admins/delete/:id', superAdmins.deleteById);

app.use('/employees', employeesRouter);
app.get('/getAdminById/:id', admins.getAdmin);
app.get('/getAdminByStatus', admins.getStatus);
app.post('/addAdmin', admins.addAdmin);
app.delete('/deleteAdmin/:id', admins.deleteAdmin);
app.put('/updateAdmin/:id', admins.updateAdmin);

app.use('/employees', employeesRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
