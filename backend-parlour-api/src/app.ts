import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { config } from './config';
import authRoutes from './routes/auth.routes';
import employeeRoutes from './routes/employee.routes';
import taskRoutes from './routes/task.routes';
import attendanceRoutes from './routes/attendance.routes';
import { socketHandler } from './sockets/socketHandler';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/attendance', attendanceRoutes);

mongoose.connect('mongodb+srv://admin:htfUJpCukftAX5sd@cluster0.yqd0rj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('MongoDB Connected'));

socketHandler(io);

export { app, server };
