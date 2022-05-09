// use "import" to import libraries
import express from 'express';
import superAdmins from './resources/super-admins';

// use "require" to import JSON files
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/super-admins', superAdmins.getAll);
app.get('/super-admins/:id', superAdmins.getById);
app.post('/super-admins/add', superAdmins.create);
app.put('/super-admins/update/:id', superAdmins.putById);
app.delete('/super-admins/delete/:id', superAdmins.deleteById);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
