import config from 'config';
import { DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../schemas/user.schema';
import { AppDataSource } from '../utils/data-source';
import { signJwt } from '../utils/jwt';
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
  // Create Access and Refresh tokens
  const access_token = signJwt(
    { sub: user.id },
    'access',
    { expiresIn: `${time.accessTokenExpiresIn}m` }
  );

  const refresh_token = signJwt(
    { sub: user.id },
    'refresh',
    { expiresIn: `${time.refreshTokenExpiresIn}m` }
  );

  return { access_token, refresh_token };
};
