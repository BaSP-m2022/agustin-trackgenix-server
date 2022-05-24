import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('628af068c5554a93f700e8be'),
  name: 'Project Example',
  description: 'This text is an example for the task 10',
  status: 'false',
  client: 'Monsters, Inc.',
  employees: [{
    _id: '628c0660caaa79d393d6d8a6',
  }],
  rates: {
    dev: 27,
    pm: 65,
    qa: 22,
  },
}];
