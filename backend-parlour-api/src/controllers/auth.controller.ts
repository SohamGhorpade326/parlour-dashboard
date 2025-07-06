import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      config.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getMe = (req: AuthRequest, res: Response): void => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res.json({
      role: req.user.role,
      email: req.user.email,
      id: req.user._id
    });
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
