import dotenv from 'dotenv';
dotenv.config();

export default {
  port: 'PORT',

  postgresConfig: {
    host: 'POSTGRES_HOST',
    port: 'POSTGRES_PORT',
    username: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB',
  },

  accessTokenPrivateKey: 'ACCESS_TOKEN_PRIVATE_KEY',
  accessTokenPublicKey: 'ACCESS_TOKEN_PUBLIC_KEY',
  refreshTokenPrivateKey: 'REFRESH_TOKEN_PRIVATE_KEY',
  refreshTokenPublicKey: 'REFRESH_TOKEN_PUBLIC_KEY',
};