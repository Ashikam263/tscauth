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
import { createClient, RedisClient } from 'redis';

const redisUrl = 'redis://localhost:6379';

const redisClient: RedisClient = createClient({
  url: redisUrl,
});

// Promisify Redis client methods for easier use with async/await
const asyncRedisClient = {
  connectAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      redisClient.on('error', (err: any) => {
        console.error('Redis connection error:', err);
        reject(err);
      });

      redisClient.on('connect', () => {
        console.log('Redis client connected successfully');
        resolve();
      });
    });
  },
  setAsync(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      redisClient.set(key, value, (err: any) => {
        if (err) {
          console.error('Redis SET operation failed:', err);
          reject(err);
        } else {
          console.log(`Successfully set '${key}' in Redis`);
          resolve();
        }
      });
    });
  },
};

const connectRedis = async () => {
  try {
    await new Promise((resolve, reject) => {
      redisClient.on('ready', () => {
        console.log('Redis client is ready');
        resolve(null);
      });
    });
    await asyncRedisClient.setAsync('try', 'Hello Welcome to Express with TypeORM');
    // Other Redis operations can be performed here
  } catch (error) {
    console.error('Failed to initialize Redis:', error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;
