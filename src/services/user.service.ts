import config from 'config';
import { DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../schemas/user.schema';
import { AppDataSource } from '../utils/data-source';
import { signJwt } from '../utils/jwt';
import time from '../config/time';
import { RoleEnumType} from '../entities/user.entity';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: DeepPartial<User>) => {
  // Set the role to 'user' by default
  input.role = input.role || RoleEnumType.USER;
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

export const getUserById = async (userId: string) => {
  return await userRepository.findOneBy({id : userId});
};

export const updateUser = async (userId: string, updateUserInput: DeepPartial<User>) => {
  await userRepository.update(userId, updateUserInput);
  return await userRepository.findOneBy({id : userId});
};

export const deleteUser = async (userId: string) => {
  await userRepository.softDelete(userId);
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


export const getUsers = async () => {
  return await userRepository.find();
};

