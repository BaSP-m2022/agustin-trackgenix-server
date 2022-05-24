import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('628281797161c78df5f6ac8c'),
  name: 'Preparation',
  description: 'This is a project to prepare a surprise party',
  status: 'Activo',
  client: 'Trackgenix SA',
  employees: {
    name: 'Carlos',
    lastName: 'Moreyra',
    role: 'DEV',
  },
  rates: {
    dev: 5,
    pm: 2,
    qa: 4,
  },
}];
