import dotenv from 'dotenv';
dotenv.config();


const time = {
  origin: 'http://localhost:3000',
  accessTokenExpiresIn: 15, // Token expiration time in minutes for access token
  refreshTokenExpiresIn: 60, // Token expiration time in minutes for refresh token
  emailFrom: 'ashikam263@gmail.com',
};

export default time;