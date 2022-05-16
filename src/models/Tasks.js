const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    details: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Task', taskSchema);
