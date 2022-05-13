/* eslint-disable no-console */
//
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

// express app setup
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
const mongoDBURL = 'mongodb+srv://BaSD:BaSD2022@cluster0.tgw7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(
  mongoDBURL,
  () => { console.log('Connected to mongoDB'); },
  (err) => { console.log('Failed to connect to mongoDB.', err); },
);

// routes
app.use('/api', router);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Welcome to Trackgenix API',
    data: undefined,
    error: false,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
