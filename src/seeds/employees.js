import mongoose from 'mongoose';

// Generate ObjetId on https://observablehq.com/@hugodf/mongodb-objectid-generator
export default [{
  _id: mongoose.Types.ObjectId('60d4a32f257e066e9495ce12'),
  name: 'Esteban',
  lastName: 'Frare',
  email: 'esteban.frare@radiumrocket.com',
  password: 'test123',
  dni: '38240915',
  address: 'Paraguay 2349',
  city: 'Rosario',
  zip: '2000',
  status: true,
  role: 'DEV',
  project: [
    {
      name: 'Test Project',
      description: 'This is a test project',
    },
  ],
}];
