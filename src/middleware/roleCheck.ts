// src/middleware/roleCheck.ts
import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Check if res.locals.user exists and has the admin role
  if (!res.locals.user || res.locals.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  // Check if res.locals.user exists and has the user role
  if (!res.locals.user || res.locals.user.role !== 'user') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
};
