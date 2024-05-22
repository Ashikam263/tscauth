import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    let tokenType: 'access' | 'refresh' = 'access';

    // Check for access token in headers or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      token = req.cookies.access_token;
    }

    // If no access token, check for refresh token in cookies
    if (!token && req.cookies.refresh_token) {
      token = req.cookies.refresh_token;
      tokenType = 'refresh';
    }

    if (!token) {
      return next(new AppError(401, 'You are not logged in'));
    }

    const decoded = verifyJwt<{ sub: string }>(token, tokenType);

    if (!decoded) {
      return next(new AppError(401, 'Invalid token or user not found'));
    }

    const user = await findUserById(decoded.sub);

    if (!user) {
      return next(new AppError(401, 'User not found'));
    }

    res.locals.user = user;
    next();
  } catch (err: any) {
    next(err);
  }
};
