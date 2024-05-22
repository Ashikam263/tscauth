import dotenv from 'dotenv';
dotenv.config();

const environmentVariables = {
  port: process.env.PORT,

  postgresConfig: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },

  accessTokenPrivateKey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY,

  smtp: {
    host: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASS,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
  },
};

export default environmentVariables;