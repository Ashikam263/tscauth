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
      origin: process.env.ORIGIN || '*', // Use environment variable or fallback to wildcard
      credentials: true,
    })
  );

  // Routes
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);

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
    validateEnv(); // Validate environment variables

    const dbOptions: ConnectionOptions = {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'ashik',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'authdb',
      entities: [path.join(__dirname, 'entities', '**', '*.entity.{ts,js}')],
      migrations: [path.join(__dirname, 'migrations', '**', '*.ts')],
      subscribers: [path.join(__dirname, 'subscribers', '**', '*.ts')],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    };

    const connection = await createConnection(dbOptions);

    const port = process.env.PORT || 3000;
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
