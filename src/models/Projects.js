const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    client: { type: String, required: true },
    // startDate: { type: Date, required: true },
    // endDate: { type: Date, required: true },
    employees: [
      {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        role: { type: String, required: true, enum: ['DEV', 'QA', 'PM'] },
      },
    ],
    rates:
      {
        dev: { type: Number, required: true },
        pm: { type: Number, required: true },
        qa: { type: Number, required: true },
      },
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
