/* eslint-disable no-console */
//
import express from 'express';
import router from './routes';

// express app setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', router);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Welcome to Trackgenix API',
    data: undefined,
    error: false,
  });
});

export default app;
