import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

// Utility type to constrain keyName to either 'accessToken' or 'refreshToken'
// type KeyName = 'accessToken' | 'refreshToken';

type KeyName = string;

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
    // Decode the base64 encoded key from the configuration
    const publicKey = Buffer.from(
      config.get<string>(keyName),
      'base64'
    ).toString('ascii');
    
    console.log(`Verifying JWT with key: ${keyName}`);

    // Verify the token using RS256 algorithm
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as T;

    return decoded;
  } catch (error) {
    console.error(`Error verifying JWT: ${error}`);
    return null;
  }
};

// export const verifyJwt = <T>(
//   token: string,
//   key: string
// ): T | null => {
//   try {
//     console.log(`Verifying JWT with key: ${key}`);

//     // Verify the token using RS256 algorithm
//     const decoded = jwt.verify(token, key, { algorithms: ['RS256'] }) as T;

//     return decoded;
//   } catch (error) {
//     console.error(`Error verifying JWT: ${error}`);
//     return null;
//   }
// };