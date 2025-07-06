import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  status: { type: String, enum: ['In', 'Out'] },
  timestamp: { type: Date, default: Date.now }
});

export const Attendance = mongoose.model('Attendance', attendanceSchema);
