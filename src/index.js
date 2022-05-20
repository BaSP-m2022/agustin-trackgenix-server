import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 3000;

mongoose.connect(
  'mongodb+srv://BaSD:BaSD2021@cluster0.5vk6q.mongodb.net/backend-template-basp?retryWrites=true&w=majority',
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
