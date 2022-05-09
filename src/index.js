// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const tasks = require('./data/tasks.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
  res.status(200).json({
    data: tasks,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
