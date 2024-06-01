import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createConnection, ConnectionOptions } from 'typeorm';
import { AppDataSource } from './utils/data-source';
import AppError from './utils/appError';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import solutionRouter from './routes/solution.routes';
import path from 'path';

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
      origin: process.env.ORIGIN || 'http://localhost:3000',
      credentials: true,
    })
  );

  // Routes
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/solutions', solutionRouter); 

  // Health checker route
  app.get('/api/healthChecker', async (_, res: Response) => {
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
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled Error:', error);
    const statusCode = error instanceof AppError ? error.statusCode || 500 : 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({
      status: 'error',
      message,
    });
  });

  // Connect to database and start server
  try {
    await AppDataSource.initialize();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

// Initialize application
startServer().catch((error) => {
  console.error('Error initializing application:', error);
});