import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['Super Admin', 'Admin'], default: 'Admin' }
});

export const User = mongoose.model('User', userSchema);
