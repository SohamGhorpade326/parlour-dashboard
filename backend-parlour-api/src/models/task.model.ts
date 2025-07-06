import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
});

export const Task = mongoose.model('Task', taskSchema);
