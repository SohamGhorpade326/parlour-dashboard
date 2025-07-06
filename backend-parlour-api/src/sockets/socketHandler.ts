import { Server } from 'socket.io';
import { Attendance } from '../models/attendance.model';
import { Employee } from '../models/employee.model';

export const socketHandler = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('punch', async (data) => {
      const { employeeId, status } = data;

      await Attendance.create({ employee: employeeId, status });

      io.emit('attendanceUpdate', { employeeId, status, timestamp: new Date() });
    });
  });
};
