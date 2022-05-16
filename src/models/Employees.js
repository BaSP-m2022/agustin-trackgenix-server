//      Mongoose     //
const mongoose = require('mongoose');

const { Schema } = mongoose;

//      Employee Schema     //
const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dni: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
    status: { type: Boolean, required: true },
    role: { type: String, required: true, enum: ['DEV', 'QA', 'PM'] },
    projects: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: true },
);

//      Export     //
export default mongoose.model('Employee', employeeSchema);
