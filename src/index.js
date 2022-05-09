// use "import" to import libraries
import express from 'express';
import admins from './resources/admins';

// use "require" to import JSON files

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

app.get('/getAdminById/:id', admins.getAdmin);
app.get('/getAdminByStatus', admins.getStatus);
app.post('/addAdmin', admins.addAdmin);
app.delete('/deleteAdmin/:id', admins.deleteAdmin);
app.put('/updateAdmin/:id', admins.updateAdmin);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
