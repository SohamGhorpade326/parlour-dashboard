import { Request, Response } from 'express';
import { Employee } from '../models/employee.model';

export const getAllEmployees = async (_req: Request, res: Response) => {
  const employees = await Employee.find();
  res.json(employees);
};

export const addEmployee = async (req: Request, res: Response) => {
  const { name } = req.body;
  const employee = new Employee({ name });
  await employee.save();
  res.json(employee);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
};