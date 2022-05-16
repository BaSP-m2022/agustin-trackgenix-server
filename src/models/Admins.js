import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
  },

  { timestamps: true },
);

export default mongoose.model('Admin', adminSchema);
