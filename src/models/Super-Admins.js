import mongoose from 'mongoose';

const { Schema } = mongoose;

const SuperAdminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('SuperAdmin', SuperAdminSchema);
