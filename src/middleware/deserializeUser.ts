import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let accessToken;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      accessToken = req.cookies.access_token;
    }

    // If there is no access token, continue to the next middleware
    if (!accessToken) {
      return next();
    }

    const decoded = verifyJwt<{ sub: string }>(accessToken, 'access');

    // If the access token is invalid or user not found, continue to the next middleware
    if (!decoded) {
      return next();
    }

    const user = await findUserById(decoded.sub);

    // If the user is not found, continue to the next middleware
    if (!user) {
      return next();
    }

    // Set the user data in res.locals
    res.locals.user = user;
    next();
  } catch (err: any) {
    next(err);
  }
};
