import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

// Utility type to constrain keyName to either 'accessToken' or 'refreshToken'
type KeyName = 'accessToken' | 'refreshToken';

export const signJwt = (
  payload: Object,
  keyName: KeyName,
  options: SignOptions
) => {
  const privateKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');
  console.log(`Signing JWT with key: ${keyName}`);
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: KeyName
): T | null => {
  try {
    const publicKey = Buffer.from(
      config.get<string>(keyName),
      'base64'
    ).toString('ascii');
    console.log(`Verifying JWT with key: ${keyName}`);
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    console.error(`Error verifying JWT: ${error}`);
    return null;
  }
};