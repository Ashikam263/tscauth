import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const {
  ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY
} = process.env;

if (ACCESS_TOKEN_PRIVATE_KEY !== ACCESS_TOKEN_PUBLIC_KEY) {
  console.error('Access token private key and public key are not the same');
}

if (REFRESH_TOKEN_PRIVATE_KEY !== REFRESH_TOKEN_PUBLIC_KEY) {
  console.error('Refresh token private key and public key are not the same');
}
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

  try {
    return jwt.sign(payload, privateKey, {
      algorithm: 'HS256', // Ensure the algorithm matches throughout the application
      ...options,
    });
  } catch (error) {
    console.error(`Error signing ${keyType} JWT:`, error);
    throw new Error(`Error signing ${keyType} JWT`);
  }
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
  } catch (error) {
    console.error(`Error verifying ${keyType} JWT:`, error);
    return null;
  }
};
