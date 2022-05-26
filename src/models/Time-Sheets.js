import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheetSchema = new Schema({
  date: { type: Date, required: true },
  regularHours: { type: Number, required: true },
  overtimeHours: { type: Number, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Task',
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
  },
}, { timestamps: true });

export default mongoose.model('TimeSheet', timesheetSchema);
