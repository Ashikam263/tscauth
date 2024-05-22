import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { AppDataSource } from './utils/data-source';
import AppError from './utils/appError';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
// import redisClient from './utils/connectRedis';
import dotenv from 'dotenv';
dotenv.config();

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
    // const message = await redisClient.get('try');
    const message = 'Hello Welcome to Express with TypeORM';
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

  // Connect to database and start server
  try {
    validateEnv(); // Validate environment variables
    const connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ashik',
      password: 'password',
      database: 'authdb',
      entities: [__dirname + '/entities/**/*.ts'], 
      migrations: [__dirname + '/migrations/**/*.ts'], 
      subscribers: [__dirname + '/subscribers/**/*.ts'], 
      synchronize: false,
      logging: false,
    });
    // Establish TypeORM database connection
    const port = process.env.PORT || config.get<number>('port');
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

// Initialize application
AppDataSource.initialize()
  .then(() => {
    startServer(); // Start server after initializing application
  })
  .catch((error) => {
    console.error('Error initializing application:', error);
  });
