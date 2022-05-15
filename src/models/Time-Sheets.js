import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheetSchema = new Schema({
  date: { type: Date, required: true },
  regularHours: { type: Number, required: true },
  overtimeHours: { type: Number, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  task: { type: String, required: true },
  employee: {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true, enum: ['DEV', 'QA', 'PM'] },
  },
  project: {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
}, { timestamps: true });

export default mongoose.model('timesheet', timesheetSchema);
