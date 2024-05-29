import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

export const isAdmin = ((req: Request, res: Response, next: NextFunction) => {
  // Check if user is an admin
  if ((req as any).user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
});

export const isUser = ((req: Request, res: Response, next: NextFunction) => {
  // Check if user is a regular user
  if ((req as any).user.role !== 'user') {
      return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
});
