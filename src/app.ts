
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


import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createConnection, Connection } from 'typeorm';
import { AppDataSource } from './utils/data-source';
import AppError from './utils/appError';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import redisClient from './utils/connectRedis';

// Validate environment variables
function validateEnv() {
  if (!process.env.PORT) {
    throw new Error('Port number not defined in environment variables');
  }
  // Add more validations as needed
}

// Initialize express application
async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '10kb' }));
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  app.use(cookieParser());
  app.use(
    cors({
      origin: config.get<string>('origin'),
      credentials: true,
    })
  );

  // Routes
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);

  // Health checker route
  app.get('/api/healthChecker', async (_, res: Response) => {
    const message = await redisClient.get('try');
    res.status(200).json({
      status: 'success',
      message,
    });
  });

  // Unhandled route
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  // Global error handler
  app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
    error.status = error.status || 'error';
    error.statusCode = error.statusCode || 500;
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  });

  return app;
}

// Connect to database and start server
async function initializeApp() {
  try {
    validateEnv(); // Validate environment variables

    // Establish TypeORM database connection
    const connection: Connection = await createConnection();

    // Initialize Redis
    await redisClient.connectAsync(); // Assuming redisClient has been properly updated

    // Start express server
    const app = await startServer();
    const port = process.env.PORT || config.get<number>('port');
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  } catch (error) {
    console.error('Error initializing application:', error);
    process.exit(1); // Exit process on error
  }
}

// Initialize application
AppDataSource.initialize()
  .then(() => {
    initializeApp(); // Start application after initializing data source
  })
  .catch((error) => {
    console.error('Error initializing data source:', error);
    process.exit(1); // Exit process on error
  });

