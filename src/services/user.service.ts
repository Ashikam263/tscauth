
import config from 'config';
import { DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../schemas/user.schema';
// import redisClient from '../utils/connectRedis';
import { AppDataSource } from '../utils/data-source';
import { signJwt } from '../utils/jwt';
import jwt from 'jsonwebtoken';
import time from '../config/time';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: DeepPartial<User>) => {
  return userRepository.save(userRepository.create(input));
};

export const findUserByEmail = async ({ email }: { email: string }) => {
  return await userRepository.findOneBy({ email });
};

export const findUserById = async (userId: string) => {
  return await userRepository.findOneBy({ id: userId });
};

export const findUser = async (query: Object) => {
  return await userRepository.findOneBy(query);
};

export const signTokens = async (user: User) => {
  
    // 2. Create Access and Refresh tokens
    const access_token = jwt.sign({ sub: user.id }, config.get('accessTokenPrivateKey'), {
      // expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    expiresIn : `${time.accessTokenExpiresIn}m`,
    });
  
    const refresh_token = jwt.sign({ sub: user.id }, config.get('refreshTokenPrivateKey'), {
      // expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
    expiresIn : `${time.refreshTokenExpiresIn}m`,
    });
  
  
  return { access_token, refresh_token };
};
