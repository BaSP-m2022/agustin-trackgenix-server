import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheetSchema = new Schema({
  date: { type: Date, required: true },
  regularHours: { type: Number, required: true },
  overtimeHours: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('timesheet', timesheetSchema);
