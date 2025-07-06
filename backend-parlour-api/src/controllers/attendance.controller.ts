import { Request, Response } from 'express';
import { Attendance } from '../models/attendance.model';

export const getAttendanceLogs = async (_req: Request, res: Response) => {
  const logs = await Attendance.find().populate('employee').sort({ timestamp: -1 });
  res.json(logs);
};
