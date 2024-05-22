import jwt from 'jsonwebtoken';
import config from 'config';

// Function to sign a JWT
export const signJwt = (
  payload: object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions
): string => {
  const privateKey = config.get<string>(keyName);

  return jwt.sign(payload, privateKey, {
    algorithm: 'HS256', // Ensure the algorithm matches throughout the application
    ...options,
  });
};

// Function to verify a JWT
export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    const publicKey = config.get<string>(keyName);

    return jwt.verify(token, publicKey, {
      algorithms: ['HS256'], // Ensure the algorithm matches the signing algorithm
    }) as T;
  } catch (err) {
    console.error('Error verifying JWT:', err);
    return null;
  }
};
