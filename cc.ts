// export const logoutHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = res.locals.user;

import { util } from "config"

//     await redisClient.del(user.id);
//     logout(res);

//     res.status(200).json({
//       status: 'success',
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

// export const refreshAccessTokenHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const refresh_token = req.cookies.refresh_token;

//     const message = 'Could not refresh access token';

//     if (!refresh_token) {
//       return next(new AppError(403, message));
//     }

//     // Validate refresh token
//     const decoded = verifyJwt<{ sub: string }>(
//       refresh_token,
//       'refreshTokenPublicKey'
//     );

//     if (!decoded) {
//       return next(new AppError(403, message));
//     }

//     // Check if user has a valid session
//     const session = await jwt.verify(decoded.sub, 'refreshTokenPublicKey');

//     if (!session) {
//       return next(new AppError(403, message));
//     }

//     // Check if user still exist
//     // const user = await findUserById(JSON.parse(session).id);
//     const user = await findUserById(decoded.sub);

//     if (!user) {
//       return next(new AppError(403, message));
//     }

//     // Sign new access token
//     const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
//       expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//     });

//     // 4. Add Cookies
//     res.cookie('access_token', access_token, accessTokenCookieOptions);
//     res.cookie('logged_in', true, {
//       ...accessTokenCookieOptions,
//       httpOnly: false,
//     });

//     // 5. Send response
//     res.status(200).json({
//       status: 'success',
//       access_token,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };


// export const refreshAccessTokenHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const refresh_token = req.cookies.refresh_token;

//     // const message = 'Could not refresh access token';

//     if (!refresh_token) {
//       return next(new AppError(403, 'Refresh token missing'));
//     }

//     // Validate refresh token (assuming your verifyJwt function is properly implemented)
//     // const decoded = verifyJwt<{ sub: string }>(
//     //   refresh_token,
//     //   'refreshTokenPublicKey'
//     // );

//     const decoded = jwt.verify(refresh_token, config.get('refreshTokenPrivateKey'));
//     console.log('Decoded Refresh Token:', decoded);
//     if (!decoded || !decoded.sub) {
//       return next(new AppError(403, 'Invalid refresh token'));
//     }

//     const userIdFromToken = decoded.sub;

//     // const session = await jwt.verify(decoded.sub, 'refreshTokenPublicKey');
//     const session = await sessionStorage.getItem(userIdFromToken);

//     if (!session) {
//       return next(new AppError(403, 'User session not found'));
//     }

//     const { userId } = JSON.parse(session);

//     if (userId !== userIdFromToken) {
//       return next(new AppError(403, 'Token user does not match session user'));
//     }

//     const user = await findUserById(decoded.sub);

//     if (!user) {
//       return next(new AppError(403, 'User not found'));
//     }

//     // Sign new access token
//     const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
//       expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//     });

//     // Set new access token cookie
//     res.cookie('access_token', access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Make sure to set secure flag in production
//       maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000, // Convert minutes to milliseconds
//     });

//     // Send response
//     res.status(200).json({
//       status: 'success',
//       access_token,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

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
//       return next(new AppError(401, 'You are not logged in'));
//     }

//     // Validate the access token

//     // const decoded = verifyJwt<{ sub: string }>(
//     //   access_token,
//     //   'accessTokenPublicKey'
//     // );
//     const decoded = jwt.verify(access_token, 'accessTokenPublicKey');

//     if (!decoded) {
//       return next(new AppError(401, `Invalid token or user doesn't exist`));
//     }

//     // Check if the user has a valid session
//     // const session = await redisClient.get(decoded.sub);

//     // if (!session) {
//     //   return next(new AppError(401, `Invalid token or session has expired`));
//     // }

//     // const session = await jwt.verify(decoded.sub, 'refreshTokenPublicKey');
//     // const session = await verifyJwt<{ sub: string }>(
//     //   access_token,
//     //   'accessTokenPublicKey'
//     // );
//     const session = await jwt.verify(access_token, 'accessTokenPublicKey');

//     if (!session) {
//       return next(new AppError(401, `Invalid token or session has expired`));
//     }

//     // Check if the user still exist
//     // const user = await findUserById(JSON.parse(session).id);
//     const user = await findUserById(decoded.sub as string);

//     if (!user) {
//       return next(new AppError(401, `Invalid token or session has expired`));
//     }

//     // Add user to res.locals
//     res.locals.user = user;

//     next();
//   } catch (err: any) {
//     next(err);
//   }
// };


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
//       return next(new AppError(401, 'You are not logged in'));
//     }

//     // Validate the access token

//     // const decoded = verifyJwt<{ sub: string }>(
//     //   access_token,
//     //   'accessTokenPublicKey'
//     // );
//     const decoded = jwt.verify(access_token, 'accessTokenPublicKey');

//     if (!decoded) {
//       return next(new AppError(401, `Invalid token or user doesn't exist`));
//     }

//     // Check if the user has a valid session
//     // const session = await redisClient.get(decoded.sub);

//     // if (!session) {
//     //   return next(new AppError(401, `Invalid token or session has expired`));
//     // }

//     // const session = await jwt.verify(decoded.sub, 'refreshTokenPublicKey');
//     // const session = await verifyJwt<{ sub: string }>(
//     //   access_token,
//     //   'accessTokenPublicKey'
//     // );
//     const session = await jwt.verify(access_token, 'accessTokenPublicKey');

//     if (!session) {
//       return next(new AppError(401, `Invalid token or session has expired`));
//     }

//     // Check if the user still exist
//     // const user = await findUserById(JSON.parse(session).id);
//     const user = await findUserById(decoded.sub as string);

//     if (!user) {
//       return next(new AppError(401, `Invalid token or session has expired`));
//     }

//     // Add user to res.locals
//     res.locals.user = user;

//     next();
//   } catch (err: any) {
//     next(err);
//   }
// };



// export const signTokens = async (user: User) => {
//   // 1. Create Session
//   // redisClient.set(user.id, JSON.stringify(user), {
//   //   EX: config.get<number>('redisCacheExpiresIn') * 60,
//   // });

//   // 2. Create Access and Refresh tokens
//   // const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
//   //   expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//   // });

//   // const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
//   //   expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
//   // });


//     // 2. Create Access and Refresh tokens
//     const access_token = jwt.sign({ sub: user.id }, config.get('accessTokenPrivateKey'), {
//       // expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//     expiresIn : `${time.accessTokenExpiresIn}m`,
//     });
  
//     const refresh_token = jwt.sign({ sub: user.id }, config.get('refreshTokenPrivateKey'), {
//       // expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
//     expiresIn : `${time.refreshTokenExpiresIn}m`,
//     });
  
  
//   return { access_token, refresh_token };
// };

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


//.env file before full implementation
// PORT=8000
// NODE_ENV=development

// DB_HOST=127.0.0.1
// DB_PORT=5432
// DB_USER=ashik
// DB_PASSWORD=password
// DB_DATABASE=authdb

// # JWT_ACCESS_TOKEN_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgQCZ9D3GRq4tRSObARER66rfihPRxJt3yWdutMJ/w4hzFPtVUrJfgYi6B0uoF0vjhnupmf2Z3uQuqU2T+rE9TIpIAQPSyIIEt8huolZL8ax9D+ekY8h/CsHYmMZdxblq5F2qXmskK+WmenSgzv+Tcobpmb/vJUkKJkg4RPIfINfwswIDAQABAoGAMX7ytWJX8Tn/PoBTSp2n7AJqaNB640IfPNpkhcsJfWZLf5z8t/PfT1+1FS+YOGguLdLSU7vzRIUt6dt5TCnlcsyfYwJnS7n+VtW9+L2L+z1cKYq1rUo4INCijuZyn257jvy6sGD9vr0XIny/dDXju596OeyH2K18p0aitHUL2UECQQDZpSQXNMDATqGkYPBDDls8iF6zHRJFmVuuHBYpBcfln+dTHWYe717vUYSv/3XUq8TSrWmkQd9zrxXx8XamsUYxAkEAtRW9CDgTCQUBTw/W1xF/rhpxnSRXaWiaW+LhRdXNzFTEqzOImDk6p4ViTQA/9d8DZip9EA9wOliJGO0I5wLYIwJAFJ3QDWKx34WTSj7kg3WYruM8FTtrv6wHQzbl4nzpspazEux1//gsxf6y0vkf8EVVH5/NogGbaRnsuj5lPuUMAQJAX5vMpIxGsJpt6Hpqaj8Y9KmNlvRbGpJZ/W26lw6di+att96LniOJLm2kSxd4ra5Dsyt3wIUGMigQqpJsAtxjlQJASLVJ4Xw7UdY5Dto7fl2/416H3iwxDEe5AgwrXWDT/WQ2aWxAjKBWGomW3NZ0M6oK9fayHcaHhiAtHk/jWNat1A==\n-----END RSA PRIVATE KEY-----"
// JWT_ACCESS_TOKEN_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgQCZ9D3GRq4tRSObARER66rfihPRxJt3yWdutMJ/w4hzFPtVUrJfgYi6B0uoF0vjhnupmf2Z3uQuqU2T+rE9TIpIAQPSyIIEt8huolZL8ax9D+ekY8h/CsHYmMZdxblq5F2qXmskK+WmenSgzv+Tcobpmb/vJUkKJkg4RPIfINfwswIDAQABAoGAMX7ytWJX8Tn/PoBTSp2n7AJqaNB640IfPNpkhcsJfWZLf5z8t/PfT1+1FS+YOGguLdLSU7vzRIUt6dt5TCnlcsyfYwJnS7n+VtW9+L2L+z1cKYq1rUo4INCijuZyn257jvy6sGD9vr0XIny/dDXju596OeyH2K18p0aitHUL2UECQQDZpSQXNMDATqGkYPBDDls8iF6zHRJFmVuuHBYpBcfln+dTHWYe717vUYSv/3XUq8TSrWmkQd9zrxXx8XamsUYxAkEAtRW9CDgTCQUBTw/W1xF/rhpxnSRXaWiaW+LhRdXNzFTEqzOImDk6p4ViTQA/9d8DZip9EA9wOliJGO0I5wLYIwJAFJ3QDWKx34WTSj7kg3WYruM8FTtrv6wHQzbl4nzpspazEux1//gsxf6y0vkf8EVVH5/NogGbaRnsuj5lPuUMAQJAX5vMpIxGsJpt6Hpqaj8Y9KmNlvRbGpJZ/W26lw6di+att96LniOJLm2kSxd4ra5Dsyt3wIUGMigQqpJsAtxjlQJASLVJ4Xw7UdY5Dto7fl2/416H3iwxDEe5AgwrXWDT/WQ2aWxAjKBWGomW3NZ0M6oK9fayHcaHhiAtHk/jWNat1A==\n-----END RSA PRIVATE KEY-----"
// JWT_ACCESS_TOKEN_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZ9D3GRq4tRSObARER66rfihPRxJt3yWdutMJ/w4hzFPtVUrJfgYi6B0uoF0vjhnupmf2Z3uQuqU2T+rE9TIpIAQPSyIIEt8huolZL8ax9D+ekY8h/CsHYmMZdxblq5F2qXmskK+WmenSgzv+Tcobpmb/vJUkKJkg4RPIfINfwswIDAQAB-----END PUBLIC KEY-----
// JWT_REFRESH_TOKEN_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----MIICXgIBAAKBgQCwtVMCLJaU9mArVOymozDserEG3B6vFwlRdDWHC28ijzr4UemoqaMnMyKE7lC/QVo9FT93Vxzbf15NS6kknBgAjXYZvYVnYJ4IjHh6Dw37vhmtbyWXigwQAIOaxxRRKoFmuRS8ZZQruVY9nyJ/vIAtA2E0dijYT+z8D/CPAheuCQIDAQABAoGBAJMSt73tgn8E+FHYYwbmeEe6bjC5cEhmMfk7cXmuiJcJAxm+g20/k22C384n08j7CbIhRyt6s6f0wHYw7NxtloMtJZS7jsw+8zwZTyduQ1/cbZk4UL8klRC/7NOXd7SOvVp39micv56CZCmXAMxcOizWycPS3Q7Cr/RVoAZZaxxpAkEA15dU1fff6opGsEnK7OHnXu2GwgnLw5lvDk9NmiQbC/OnycBlx0Qolw9XsnpMQnv/JVdx7St0g3Y1iNYXKBRUJwJBANHUSPCo946PTswDRvH8tHhXJKr6XRK2cydcybvmLVJxbiXaGCU0tc6of/PfnO4RxBN96A9HhHJGQGLemclkWk8CQQCw2kpUj9cWbkIYoSAe/B2xqIXQLPsDRJ1ujq1pEc9CGal9fh+/u/DUIljdZyehrlgaSMaDOQ+GO/UkgANU9IAnAkEAqHhENA3F7c08G+tJrAMUt0ZoZ2rrDZo1rNYAFwBBRV9Ta8rG9iBzFMEPMrRIYJEdF/VQO+xU+BdVnMxTN3J+WwJAcHjTRM8vTe0vaqmphSCE4pdcIP5+zKOhQtJmHTR/iaNCMNxcyKdaMVBQPhXEkRbxifHK8jgasQZNy3f76uUBEg==-----END RSA PRIVATE KEY-----
// JWT_REFRESH_TOKEN_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwtVMCLJaU9mArVOymozDserEG3B6vFwlRdDWHC28ijzr4UemoqaMnMyKE7lC/QVo9FT93Vxzbf15NS6kknBgAjXYZvYVnYJ4IjHh6Dw37vhmtbyWXigwQAIOaxxRRKoFmuRS8ZZQruVY9nyJ/vIAtA2E0dijYT+z8D/CPAheuCQIDAQAB-----END PUBLIC KEY-----


// accessTokenPrivateKey=JWT_ACCESS_TOKEN_PRIVATE_KEY
// accessTokenPublicKey=JWT_ACCESS_TOKEN_PUBLIC_KEY
// refreshTokenPrivateKey=JWT_REFRESH_TOKEN_PRIVATE_KEY
// refreshTokenPublicKey=JWT_REFRESH_TOKEN_PUBLIC_KEY

// app.ts

// require('dotenv').config();
// import express, { NextFunction, Request, Response } from 'express';
// import config from 'config';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import { AppDataSource } from './utils/data-source';
// import AppError from './utils/appError';
// import authRouter from './routes/auth.routes';
// import userRouter from './routes/user.routes';
// import validateEnv from './utils/validateEnv';
// import redisClient from './utils/connectRedis';

// AppDataSource.initialize()
//   .then(async () => {
//     // VALIDATE ENV
//     validateEnv();

//     const app = express();

//     // TEMPLATE ENGINE

//     // MIDDLEWARE

//     // 1. Body parser
//     app.use(express.json({ limit: '10kb' }));

//     // 2. Logger
//     if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//     // 3. Cookie Parser
//     app.use(cookieParser());

//     // 4. Cors
//     app.use(
//       cors({
//         origin: config.get<string>('origin'),
//         credentials: true,
//       })
//     );

//     // ROUTES
//     app.use('/api/auth', authRouter);
//     app.use('/api/users', userRouter);

//     // HEALTH CHECKER
//     app.get('/api/healthChecker', async (_, res: Response) => {
//       const message = await redisClient.get('try');

//       res.status(200).json({
//         status: 'success',
//         message,
//       });
//     });

//     // UNHANDLED ROUTE
//     app.all('*', (req: Request, res: Response, next: NextFunction) => {
//       next(new AppError(404, `Route ${req.originalUrl} not found`));
//     });

//     // GLOBAL ERROR HANDLER
//     app.use(
//       (error: AppError, req: Request, res: Response, next: NextFunction) => {
//         error.status = error.status || 'error';
//         error.statusCode = error.statusCode || 500;

//         res.status(error.statusCode).json({
//           status: error.status,
//           message: error.message,
//         });
//       }
//     );

//     const port = config.get<number>('port');
//     app.listen(port);

//     console.log(`Server started on port: ${port}`);
//   })
//   .catch((error) => console.log(error));


// connectRedis.ts src>utils>connectRedis.ts
// import { createClient } from 'redis';

// const redisUrl = 'redis://localhost:6379';

// const redisClient = createClient({
//   url: redisUrl,
// });

// const connectRedis = async () => {
//   try {
//     await redisClient.connect();
//     console.log('Redis client connect successfully');
//     redisClient.set('try', 'Hello Welcome to Express with TypeORM');
//   } catch (error) {
//     console.log(error);
//     setTimeout(connectRedis, 5000);
//   }
// };

// connectRedis();

// export default redisClient;

// src>config>envvariable.ts
// export default {
//   port: 'PORT',

//   postgresConfig: {
//     host: 'POSTGRES_HOST',
//     port: 'POSTGRES_PORT',
//     username: 'POSTGRES_USER',
//     password: 'POSTGRES_PASSWORD',
//     database: 'POSTGRES_DB',
//   },

//   accessTokenPrivateKey: 'JWT_ACCESS_TOKEN_PRIVATE_KEY',
//   accessTokenPublicKey: 'JWT_ACCESS_TOKEN_PUBLIC_KEY',
//   refreshTokenPrivateKey: 'JWT_REFRESH_TOKEN_PRIVATE_KEY',
//   refreshTokenPublicKey: 'JWT_REFRESH_TOKEN_PUBLIC_KEY',

//   smtp: {
//     host: 'EMAIL_HOST',
//     pass: 'EMAIL_PASS',
//     port: 'EMAIL_PORT',
//     user: 'EMAIL_USER',
//   },
// };

// src>config>time.ts
// export default {
//   origin: 'http://localhost:3000',
//   accessTokenExpiresIn: 15,
//   refreshTokenExpiresIn: 60,
//   // redisCacheExpiresIn: 60,
//   emailFrom: 'ashikam263@gmail.com',
// };


// src>utils>appError.ts
// export default class AppError extends Error {
//   status: string;
//   isOperational: boolean;
//   constructor(public statusCode: number = 500, public message: string) {
//     super(message);
//     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//     this.isOperational = true;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }


// src>utils>data-source.ts
// require('dotenv').config();
// import 'reflect-metadata';
// import { DataSource } from 'typeorm';
// import config from 'config';

// const postgresConfig = config.get<{
//   host: string;
//   port: number;
//   username: string;
//   password: string;
//   database: string;
// }>('postgresConfig');

// export const AppDataSource = new DataSource({
//   ...postgresConfig,
//   type: 'postgres',
//   synchronize: false,
//   logging: false,
//   entities: ['src/entities/**/*.entity{.ts,.js}'],
//   migrations: ['src/migrations/**/*{.ts,.js}'],
//   subscribers: ['src/subscribers/**/*{.ts,.js}'],
// });

// .env.ts
// PORT=8000
// NODE_ENV=development

// DB_HOST=127.0.0.1
// DB_PORT=5432
// DB_USER=ashik
// DB_PASSWORD=password
// DB_DATABASE=authdb

// # JWT_ACCESS_TOKEN_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgQCZ9D3GRq4tRSObARER66rfihPRxJt3yWdutMJ/w4hzFPtVUrJfgYi6B0uoF0vjhnupmf2Z3uQuqU2T+rE9TIpIAQPSyIIEt8huolZL8ax9D+ekY8h/CsHYmMZdxblq5F2qXmskK+WmenSgzv+Tcobpmb/vJUkKJkg4RPIfINfwswIDAQABAoGAMX7ytWJX8Tn/PoBTSp2n7AJqaNB640IfPNpkhcsJfWZLf5z8t/PfT1+1FS+YOGguLdLSU7vzRIUt6dt5TCnlcsyfYwJnS7n+VtW9+L2L+z1cKYq1rUo4INCijuZyn257jvy6sGD9vr0XIny/dDXju596OeyH2K18p0aitHUL2UECQQDZpSQXNMDATqGkYPBDDls8iF6zHRJFmVuuHBYpBcfln+dTHWYe717vUYSv/3XUq8TSrWmkQd9zrxXx8XamsUYxAkEAtRW9CDgTCQUBTw/W1xF/rhpxnSRXaWiaW+LhRdXNzFTEqzOImDk6p4ViTQA/9d8DZip9EA9wOliJGO0I5wLYIwJAFJ3QDWKx34WTSj7kg3WYruM8FTtrv6wHQzbl4nzpspazEux1//gsxf6y0vkf8EVVH5/NogGbaRnsuj5lPuUMAQJAX5vMpIxGsJpt6Hpqaj8Y9KmNlvRbGpJZ/W26lw6di+att96LniOJLm2kSxd4ra5Dsyt3wIUGMigQqpJsAtxjlQJASLVJ4Xw7UdY5Dto7fl2/416H3iwxDEe5AgwrXWDT/WQ2aWxAjKBWGomW3NZ0M6oK9fayHcaHhiAtHk/jWNat1A==\n-----END RSA PRIVATE KEY-----"
// JWT_ACCESS_TOKEN_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgQCZ9D3GRq4tRSObARER66rfihPRxJt3yWdutMJ/w4hzFPtVUrJfgYi6B0uoF0vjhnupmf2Z3uQuqU2T+rE9TIpIAQPSyIIEt8huolZL8ax9D+ekY8h/CsHYmMZdxblq5F2qXmskK+WmenSgzv+Tcobpmb/vJUkKJkg4RPIfINfwswIDAQABAoGAMX7ytWJX8Tn/PoBTSp2n7AJqaNB640IfPNpkhcsJfWZLf5z8t/PfT1+1FS+YOGguLdLSU7vzRIUt6dt5TCnlcsyfYwJnS7n+VtW9+L2L+z1cKYq1rUo4INCijuZyn257jvy6sGD9vr0XIny/dDXju596OeyH2K18p0aitHUL2UECQQDZpSQXNMDATqGkYPBDDls8iF6zHRJFmVuuHBYpBcfln+dTHWYe717vUYSv/3XUq8TSrWmkQd9zrxXx8XamsUYxAkEAtRW9CDgTCQUBTw/W1xF/rhpxnSRXaWiaW+LhRdXNzFTEqzOImDk6p4ViTQA/9d8DZip9EA9wOliJGO0I5wLYIwJAFJ3QDWKx34WTSj7kg3WYruM8FTtrv6wHQzbl4nzpspazEux1//gsxf6y0vkf8EVVH5/NogGbaRnsuj5lPuUMAQJAX5vMpIxGsJpt6Hpqaj8Y9KmNlvRbGpJZ/W26lw6di+att96LniOJLm2kSxd4ra5Dsyt3wIUGMigQqpJsAtxjlQJASLVJ4Xw7UdY5Dto7fl2/416H3iwxDEe5AgwrXWDT/WQ2aWxAjKBWGomW3NZ0M6oK9fayHcaHhiAtHk/jWNat1A==\n-----END RSA PRIVATE KEY-----"
// JWT_ACCESS_TOKEN_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZ9D3GRq4tRSObARER66rfihPRxJt3yWdutMJ/w4hzFPtVUrJfgYi6B0uoF0vjhnupmf2Z3uQuqU2T+rE9TIpIAQPSyIIEt8huolZL8ax9D+ekY8h/CsHYmMZdxblq5F2qXmskK+WmenSgzv+Tcobpmb/vJUkKJkg4RPIfINfwswIDAQAB-----END PUBLIC KEY-----
// JWT_REFRESH_TOKEN_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----MIICXgIBAAKBgQCwtVMCLJaU9mArVOymozDserEG3B6vFwlRdDWHC28ijzr4UemoqaMnMyKE7lC/QVo9FT93Vxzbf15NS6kknBgAjXYZvYVnYJ4IjHh6Dw37vhmtbyWXigwQAIOaxxRRKoFmuRS8ZZQruVY9nyJ/vIAtA2E0dijYT+z8D/CPAheuCQIDAQABAoGBAJMSt73tgn8E+FHYYwbmeEe6bjC5cEhmMfk7cXmuiJcJAxm+g20/k22C384n08j7CbIhRyt6s6f0wHYw7NxtloMtJZS7jsw+8zwZTyduQ1/cbZk4UL8klRC/7NOXd7SOvVp39micv56CZCmXAMxcOizWycPS3Q7Cr/RVoAZZaxxpAkEA15dU1fff6opGsEnK7OHnXu2GwgnLw5lvDk9NmiQbC/OnycBlx0Qolw9XsnpMQnv/JVdx7St0g3Y1iNYXKBRUJwJBANHUSPCo946PTswDRvH8tHhXJKr6XRK2cydcybvmLVJxbiXaGCU0tc6of/PfnO4RxBN96A9HhHJGQGLemclkWk8CQQCw2kpUj9cWbkIYoSAe/B2xqIXQLPsDRJ1ujq1pEc9CGal9fh+/u/DUIljdZyehrlgaSMaDOQ+GO/UkgANU9IAnAkEAqHhENA3F7c08G+tJrAMUt0ZoZ2rrDZo1rNYAFwBBRV9Ta8rG9iBzFMEPMrRIYJEdF/VQO+xU+BdVnMxTN3J+WwJAcHjTRM8vTe0vaqmphSCE4pdcIP5+zKOhQtJmHTR/iaNCMNxcyKdaMVBQPhXEkRbxifHK8jgasQZNy3f76uUBEg==-----END RSA PRIVATE KEY-----
// JWT_REFRESH_TOKEN_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwtVMCLJaU9mArVOymozDserEG3B6vFwlRdDWHC28ijzr4UemoqaMnMyKE7lC/QVo9FT93Vxzbf15NS6kknBgAjXYZvYVnYJ4IjHh6Dw37vhmtbyWXigwQAIOaxxRRKoFmuRS8ZZQruVY9nyJ/vIAtA2E0dijYT+z8D/CPAheuCQIDAQAB-----END PUBLIC KEY-----


// accessTokenPrivateKey=JWT_ACCESS_TOKEN_PRIVATE_KEY
// accessTokenPublicKey=JWT_ACCESS_TOKEN_PUBLIC_KEY
// refreshTokenPrivateKey=JWT_REFRESH_TOKEN_PRIVATE_KEY
// refreshTokenPublicKey=JWT_REFRESH_TOKEN_PUBLIC_KEY

// src>contollers>auth.controller.ts as on 22-05-2024 11:07 is 
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { deserialize } from "v8";
// import config from 'config';
// import { CreateUserInput, LoginUserInput } from '../schemas/user.schema';
// import {
//   createUser,
//   findUserByEmail,
//   findUserById,
//   signTokens,
// } from '../services/user.service';
// import AppError from '../utils/appError'
// // import redisClient from '../utils/connectRedis';
// import { signJwt, verifyJwt } from '../utils/jwt';
// import { User } from '../entities/user.entity';
// import jwt from 'jsonwebtoken';
// import time from '../config/time';
// import environmentVariables from '../config/envvariables';

// const cookiesOptions: CookieOptions = {
//   httpOnly: true,
//   sameSite: 'lax',
// };

// if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

// const accessTokenCookieOptions: CookieOptions = {
//   ...cookiesOptions,
//   expires: new Date(
//     Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
//   ),
//   maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
// };

// const refreshTokenCookieOptions: CookieOptions = {
//   ...cookiesOptions,
//   expires: new Date(
//     Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
//   ),
//   maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
// };

// export const registerUserHandler = async (
//   req: Request<{}, {}, CreateUserInput>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { name, password, email } = req.body;

//     const user = await createUser({
//       name,
//       email: email.toLowerCase(),
//       password,
//     });

//     res.status(201).json({
//       status: 'success',
//       data: {
//         user,
//       },
//     });
//   } catch (err: any) {
//     if (err.code === '23505') {
//       return res.status(409).json({
//         status: 'fail',
//         message: 'User with that email already exist',
//       });
//     }
//     next(err);
//   }
// };

// export const loginUserHandler = async (
//   req: Request<{}, {}, LoginUserInput>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password } = req.body;
//     const user = await findUserByEmail({ email });

//     //1. Check if user exists and password is valid
//     if (!user || !(await User.comparePasswords(password, user.password))) {
//       return next(new AppError(400, 'Invalid email or password'));
//     }

//     // 2. Sign Access and Refresh Tokens
//     const { access_token, refresh_token } = await signTokens(user);

//     // 3. Add Cookies
//     res.cookie('access_token', access_token, accessTokenCookieOptions);
//     res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
//     res.cookie('logged_in', true, {
//       ...accessTokenCookieOptions,
//       httpOnly: false,
//     });

//     // 4. Send response
//     res.status(200).json({
//       status: 'success',
//       access_token,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };



// export const refreshAccessTokenHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const refresh_token = req.cookies.refresh_token;

//     // const message = 'Could not refresh access token';

//     if (!refresh_token) {
//       return next(new AppError(403, 'Refresh token missing'));
//     }

//     // Validate refresh token (assuming your verifyJwt function is properly implemented)
//     // const decoded = verifyJwt<{ sub: string }>(
//     //   refresh_token,
//     //   'refreshTokenPublicKey'
//     // );
//     // const decoded = jwt.verify(refresh_token, config.get('refreshTokenPrivateKey'));
//     const decoded = jwt.verify(refresh_token, environmentVariables.refreshTokenPrivateKey || '') as { sub: string };


//     if (!decoded) {
//       return next(new AppError(403, 'Invalid Refresh Token'));
//     }

//     // Check if user exists by decoding the subject ID from the refresh token
//     const user = await findUserById(decoded.sub as string);

//     if (!user) {
//       return next(new AppError(403, 'User not found'));
//     }

//     // Sign new access token
//     // const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
//     //   expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//     // });

//     const access_token = jwt.sign({ sub: user.id }, config.get('accessTokenPrivateKey'), {
//       expiresIn: `${time.accessTokenExpiresIn}m`,
//     });

//     // Set new access token cookie
//     res.cookie('access_token', access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Make sure to set secure flag in production
//       maxAge: time.accessTokenExpiresIn * 60 * 1000, // Convert minutes to milliseconds
//     });

//     // Send response
//     res.status(200).json({
//       status: 'success',
//       access_token,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

// const logout = (res: Response) => {
//   res.cookie('access_token', '', { maxAge: 1 });
//   res.cookie('refresh_token', '', { maxAge: 1 });
//   res.cookie('logged_in', '', { maxAge: 1 });
// };

// export const logoutHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = res.locals.user;
//     // Validate the token before proceeding
//     if (!user) {
//       console.log('User not found in res.locals');
//       return res.status(401).json({
//         status: 'fail',
//         message: 'Invalid token',
//       });
//     }

//     res.clearCookie('access_token');
//     res.clearCookie('refresh_token');

//     // Respond with success status
//     return res.status(200).json({
//       status: 'success',
//       message: 'Logout successful',
//     });
//   } catch (err) {
//     console.error('Logout error:', err);
//     res.status(500).json({
//       status: 'error',
//       message: 'Internal server error',
//     });
//   }
// };


// src>middleware>deserializeUser.ts as on 22-05-2024 12:17 is
// import { NextFunction, Request, Response } from 'express';
// import { findUserById } from '../services/user.service';
// import AppError from '../utils/appError';
// // import redisClient from '../utils/connectRedis';
// import { verifyJwt } from '../utils/jwt';
// import jwt from 'jsonwebtoken';
// import time from '../config/time';
// import dotenv from 'dotenv';
// dotenv.config();

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


//     // const accessTokenPrivateKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY;
//     const accessTokenPrivateKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY?.replace(/\\n/g, '\n');
//     if (!accessTokenPrivateKey) {
//       throw new Error('JWT_ACCESS_TOKEN_PRIVATE_KEY is not defined');
//     }

//     const decoded = verifyJwt<{ sub: string }>(access_token, accessTokenPrivateKey);

//     if (!decoded) {
//       return next(new AppError(401, `Invalid token or user doesn't exist`));
//     }

//     const user = await findUserById(decoded.sub);

//     if (!user) {
//       return next(new AppError(401, `User not found`));
//     }

//     res.locals.user = user;

//     next();
//   } catch (err: any) {
//     console.error('Token verification failed:', err);
//     if (err.name === 'TokenExpiredError') {
//       return next(new AppError(401, 'Token has expired'));
//     } else if (err.name === 'JsonWebTokenError') {
//       return next(new AppError(401, 'Invalid token'));
//     }

//     next(err);
//   }
// };

// src>utils>jwt.ts as on 22-05-2024 12:41 is
import jwt, { SignOptions } from 'jsonwebtoken';
// import config from 'config';

// // Utility type to constrain keyName to either 'accessToken' or 'refreshToken'
// // type KeyName = 'accessToken' | 'refreshToken';

// type KeyName = string;

// export const signJwt = (
//   payload: Object,
//   keyName: KeyName,
//   options: SignOptions
// ) => {
//   const privateKey = Buffer.from(
//     config.get<string>(keyName),
//     'base64'
//   ).toString('ascii');
//   console.log(`Signing JWT with key: ${keyName}`);
//   return jwt.sign(payload, privateKey, {
//     ...(options && options),
//     algorithm: 'RS256',
//   });
// };

// export const verifyJwt = <T>(
//   token: string,
//   keyName: KeyName
// ): T | null => {
//   try {
//     // Decode the base64 encoded key from the configuration
//     const publicKey = Buffer.from(
//       config.get<string>(keyName),
//       'base64'
//     ).toString('ascii');
    
//     console.log(`Verifying JWT with key: ${keyName}`);

//     // Verify the token using RS256 algorithm
//     const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as T;

//     return decoded;
//   } catch (error) {
//     console.error(`Error verifying JWT: ${error}`);
//     return null;
//   }
// };

//the deserailizerr user code is working for 
// import { NextFunction, Request, Response } from 'express';
// import { verifyJwt } from '../utils/jwt';
// import { findUserById } from '../services/user.service';
// import AppError from '../utils/appError';

// export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     let accessToken;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       accessToken = req.headers.authorization.split(' ')[1];
//     } else if (req.cookies.access_token) {
//       accessToken = req.cookies.access_token;
//     }

//     // If there is no access token, continue to the next middleware
//     if (!accessToken) {
//       return next();
//     }

//     const decoded = verifyJwt<{ sub: string }>(accessToken, 'access');

//     // If the access token is invalid or user not found, continue to the next middleware
//     if (!decoded) {
//       return next();
//     }

//     const user = await findUserById(decoded.sub);

//     // If the user is not found, continue to the next middleware
//     if (!user) {
//       return next();
//     }

//     // Set the user data in res.locals
//     res.locals.user = user;
//     next();
//   } catch (err: any) {
//     next(err);
//   }
// };


