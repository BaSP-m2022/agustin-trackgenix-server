import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('62817f32ba9843827a61371f'),
    date: '2022-10-05T03:00:00.000+00:00',
    regularHours: '5',
    overtimeHours: '1',
    startTime: '900',
    endTime: '2300',
    task: mongoose.Types.ObjectId('62824ff02de0708e369fc99c'),
    employee: mongoose.Types.ObjectId('62898ab9c805478374c554bf'),
    project: mongoose.Types.ObjectId('628283bb7161c78df5f6acb0'),
  },
];
