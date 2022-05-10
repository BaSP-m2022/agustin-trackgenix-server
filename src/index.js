// use "import" to import libraries
import express from 'express';

const tasks = require('./resources/tasks');

// use "require" to import JSON files
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
