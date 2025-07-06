import { Request, Response } from 'express';
import { Task } from '../models/task.model';

export const getAllTasks = async (_req: Request, res: Response) => {
  const tasks = await Task.find().populate('assignedTo');
  res.json(tasks);
};

export const addTask = async (req: Request, res: Response) => {
  const { title, assignedTo } = req.body;
  const task = new Task({ title, assignedTo });
  await task.save();
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
export const updateTask = async (req: Request, res: Response) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, { title: req.body.title, assignedTo: req.body.assignedTo }, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
};