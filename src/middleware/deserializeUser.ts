import dotenv from 'dotenv';
dotenv.config();

import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';
// import redisClient from '../utils/connectRedis';
import { verifyJwt } from '../utils/jwt';
import jwt from 'jsonwebtoken';
import time from '../config/time';


// export const deserializeUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let access_token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       access_token = req.headers.authorization.split(' ')[1];
//     } else if (req.cookies.access_token) {
//       access_token = req.cookies.access_token;
//     }

//     if (!access_token) {
//       console.log('No access token provided');
//       return next(new AppError(401, 'You are not logged in'));
//     }

//     // Retrieve JWT public key from environment variables
//     const accessTokenPublicKey = process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY;
//     if (!accessTokenPublicKey) {
//       return next(new AppError(500, 'JWT public key not configured'));
//     }
//     console.log(access_token)
//     // Validate the access token
//     const decoded = jwt.verify(access_token, accessTokenPublicKey, { algorithms: ['RS256'] }) as { sub: string };
//     // console.log('Decoded Token:', decoded);
//     if (!decoded) {
//       return next(new AppError(401, `Invalid token or user doesn't exist`));
//     }

//     // Check if the user still exists
//     const user = await findUserById(decoded.sub);

//     if (!user) {
//       return next(new AppError(401, `User not found`));
//     }

//     // Add user to res.locals for use in subsequent middleware/routes
//     res.locals.user = user;

//     next();
//   } catch (err: any) {
//     // Handle JWT verification errors
//     console.error('Token verification failed:', err);
//     if (err.name === 'TokenExpiredError') {
//       return next(new AppError(401, 'Token has expired'));
//     } else if (err.name === 'JsonWebTokenError') {
//       return next(new AppError(401, 'Invalid token this is issue'));
//     }

//     next(err);
//   }
// };


export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      console.log('No access token provided');
      return next(new AppError(401, 'You are not logged in'));
    }


    const accessTokenPrivateKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY;
    
    const decoded = verifyJwt<{ sub: string }>(access_token, accessTokenPrivateKey!);

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }

    const user = await findUserById(decoded.sub);

    if (!user) {
      return next(new AppError(401, `User not found`));
    }

    res.locals.user = user;

    next();
  } catch (err: any) {
    console.error('Token verification failed:', err);
    if (err.name === 'TokenExpiredError') {
      return next(new AppError(401, 'Token has expired'));
    } else if (err.name === 'JsonWebTokenError') {
      return next(new AppError(401, 'Invalid token'));
    }

    next(err);
  }
};