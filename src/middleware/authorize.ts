import { NextFunction, Request, Response } from 'express';

export const authorize = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.user?.role;

    if (!userRole) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. User role not provided.'
      });
    }

    if (userRole === 'admin') {
      return next();
    }

    if (userRole !== requiredRole) {
      return res.status(403).json({
        status: 'fail',
        message: 'Forbidden. You do not have permission to access this resource.'
      });
    }
    
    next();
  };
};
