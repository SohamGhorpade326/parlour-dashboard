import mongoose from 'mongoose';
import { config } from './src/config';
import { Employee } from './src/models/employee.model';
import { Task } from './src/models/task.model';
import { Attendance } from './src/models/attendance.model';

const seedData = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:htfUJpCukftAX5sd@cluster0.yqd0rj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB Connected');

    // Clear existing data (optional)
    await Employee.deleteMany({});
    await Task.deleteMany({});
    await Attendance.deleteMany({});

    // Insert Employees
    const employees = await Employee.insertMany([
      { name: 'John Doe' },
      { name: 'Jane Smith' },
      { name: 'Mike Johnson' },
    ]);
    console.log('Employees inserted');

    // Insert Tasks with unique taskCode
    await Task.insertMany([
      { title: 'Reception Duty', assignedTo: employees[0]._id, taskCode: 'T001' },
      { title: 'Hair Styling', assignedTo: employees[1]._id, taskCode: 'T002' },
      { title: 'Billing', assignedTo: employees[2]._id, taskCode: 'T003' },
    ]);
    console.log('Tasks inserted');

    // Insert Attendance Logs
    await Attendance.insertMany([
      { employee: employees[0]._id, status: 'In' },
      { employee: employees[1]._id, status: 'Out' },
      { employee: employees[2]._id, status: 'In' },
    ]);
    console.log('Attendance logs inserted');

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
};

seedData();
