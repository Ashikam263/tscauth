import { NextFunction, Request, Response } from 'express';

export const authorize = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.user.role;

    if (userRole !== requiredRole) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to access this resource',
      });
    }
    next();
  };
};
