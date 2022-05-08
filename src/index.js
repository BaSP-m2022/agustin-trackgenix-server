// use "import" to import libraries
import express from 'express';
// import status from 'express/lib/response';
import admins from './resources/admins';

// use "require" to import JSON files
// const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.get('/getById/:id', admins.getAdmin);
app.get('/getByStatus', admins.getStatus);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
