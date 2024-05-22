import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const {
  ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY
} = process.env;

// Function to sign a JWT
export const signJwt = (
  payload: object,
  keyType: 'access' | 'refresh',
  options?: jwt.SignOptions
): string => {
  const privateKey = keyType === 'access' ? ACCESS_TOKEN_PRIVATE_KEY : REFRESH_TOKEN_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error(`Missing ${keyType} token private key`);
  }

  return jwt.sign(payload, privateKey, {
    algorithm: 'HS256', // Ensure the algorithm matches throughout the application
    ...options,
  });
};

// Function to verify a JWT
export const verifyJwt = <T>(
  token: string,
  keyType: 'access' | 'refresh'
): T | null => {
  try {
    const publicKey = keyType === 'access' ? ACCESS_TOKEN_PUBLIC_KEY : REFRESH_TOKEN_PUBLIC_KEY;

    if (!publicKey) {
      throw new Error(`Missing ${keyType} token public key`);
    }

    return jwt.verify(token, publicKey, {
      algorithms: ['HS256'], // Ensure the algorithm matches the signing algorithm
    }) as T;
  } catch (err) {
    console.error('Error verifying JWT:', err);
    return null;
  }
};
