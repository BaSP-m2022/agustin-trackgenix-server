import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('62898d14882f8759987f5a37'),
  name: 'Lucas',
  lastName: 'Prat',
  email: 'lucas@gmail.com',
  password: '12345678',
  dni: 32862741,
  address: 'Salvat 884',
  city: 'Rosario',
  zip: 2000,
  status: true,
  role: 'QA',
  projects: [
    { _id: mongoose.Types.ObjectId('6282835e7161c78df5f6acab') },
    { _id: mongoose.Types.ObjectId('628283bb7161c78df5f6acb0') },
  ],
}];
