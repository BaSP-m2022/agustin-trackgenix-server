import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;
const { DATABASE_URL } = process.env;

mongoose.connect(
  DATABASE_URL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('🔴 Database error: ', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('✅ Database connected');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
