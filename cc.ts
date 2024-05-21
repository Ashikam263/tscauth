// export const logoutHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = res.locals.user;

//     await redisClient.del(user.id);
//     logout(res);

//     res.status(200).json({
//       status: 'success',
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

// export const refreshAccessTokenHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const refresh_token = req.cookies.refresh_token;

//     const message = 'Could not refresh access token';

//     if (!refresh_token) {
//       return next(new AppError(403, message));
//     }

//     // Validate refresh token
//     const decoded = verifyJwt<{ sub: string }>(
//       refresh_token,
//       'refreshTokenPublicKey'
//     );

//     if (!decoded) {
//       return next(new AppError(403, message));
//     }

//     // Check if user has a valid session
//     const session = await jwt.verify(decoded.sub, 'refreshTokenPublicKey');

//     if (!session) {
//       return next(new AppError(403, message));
//     }

//     // Check if user still exist
//     // const user = await findUserById(JSON.parse(session).id);
//     const user = await findUserById(decoded.sub);

//     if (!user) {
//       return next(new AppError(403, message));
//     }

//     // Sign new access token
//     const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
//       expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//     });

//     // 4. Add Cookies
//     res.cookie('access_token', access_token, accessTokenCookieOptions);
//     res.cookie('logged_in', true, {
//       ...accessTokenCookieOptions,
//       httpOnly: false,
//     });

//     // 5. Send response
//     res.status(200).json({
//       status: 'success',
//       access_token,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };


// export const refreshAccessTokenHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const refresh_token = req.cookies.refresh_token;

//     // const message = 'Could not refresh access token';

//     if (!refresh_token) {
//       return next(new AppError(403, 'Refresh token missing'));
//     }

//     // Validate refresh token (assuming your verifyJwt function is properly implemented)
//     // const decoded = verifyJwt<{ sub: string }>(
//     //   refresh_token,
//     //   'refreshTokenPublicKey'
//     // );

//     const decoded = jwt.verify(refresh_token, config.get('refreshTokenPrivateKey'));
//     console.log('Decoded Refresh Token:', decoded);
//     if (!decoded || !decoded.sub) {
//       return next(new AppError(403, 'Invalid refresh token'));
//     }

//     const userIdFromToken = decoded.sub;

//     // const session = await jwt.verify(decoded.sub, 'refreshTokenPublicKey');
//     const session = await sessionStorage.getItem(userIdFromToken);

//     if (!session) {
//       return next(new AppError(403, 'User session not found'));
//     }

//     const { userId } = JSON.parse(session);

//     if (userId !== userIdFromToken) {
//       return next(new AppError(403, 'Token user does not match session user'));
//     }

//     const user = await findUserById(decoded.sub);

//     if (!user) {
//       return next(new AppError(403, 'User not found'));
//     }

//     // Sign new access token
//     const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
//       expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//     });

//     // Set new access token cookie
//     res.cookie('access_token', access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Make sure to set secure flag in production
//       maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000, // Convert minutes to milliseconds
//     });

//     // Send response
//     res.status(200).json({
//       status: 'success',
//       access_token,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

// export const deserializeUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let access_token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       access_token = req.headers.authorization.split(' ')[1];
//     } else if (req.cookies.access_token) {
//       access_token = req.cookies.access_token;
//     }

//     if (!access_token) {
//       return next(new AppError(401, 'You are not logged in'));
//     }

//     // Validate the access token

//     // const decoded = verifyJwt<{ sub: string }>(
//     //   access_token,
//     //   'accessTokenPublicKey'
//     // );
//     const decoded = jwt.verify(access_token, 'accessTokenPublicKey');

//     if (!decoded) {
//       return next(new AppError(401, `Invalid token or user doesn't exist`));
//     }

//     // Check if the user has a valid session
//     // const session = await redisClient.get(decoded.sub);

//     // if (!session) {
//     //   return next(new AppError(401, `Invalid token or session has expired`));
//     // }

//     // const session = await jwt.verify(decoded.sub, 'refreshTokenPublicKey');
//     // const session = await verifyJwt<{ sub: string }>(
//     //   access_token,
//     //   'accessTokenPublicKey'
//     // );
//     const session = await jwt.verify(access_token, 'accessTokenPublicKey');

//     if (!session) {
//       return next(new AppError(401, `Invalid token or session has expired`));
//     }

//     // Check if the user still exist
//     // const user = await findUserById(JSON.parse(session).id);
//     const user = await findUserById(decoded.sub as string);

//     if (!user) {
//       return next(new AppError(401, `Invalid token or session has expired`));
//     }

//     // Add user to res.locals
//     res.locals.user = user;

//     next();
//   } catch (err: any) {
//     next(err);
//   }
// };


// export const deserializeUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let access_token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       access_token = req.headers.authorization.split(' ')[1];
//     } else if (req.cookies.access_token) {
//       access_token = req.cookies.access_token;
//     }

//     if (!access_token) {
//       return next(new AppError(401, 'You are not logged in'));
//     }

//     // Validate the access token

//     // const decoded = verifyJwt<{ sub: string }>(
//     //   access_token,
//     //   'accessTokenPublicKey'
//     // );
//     const decoded = jwt.verify(access_token, 'accessTokenPublicKey');

//     if (!decoded) {
//       return next(new AppError(401, `Invalid token or user doesn't exist`));
//     }

//     // Check if the user has a valid session
//     // const session = await redisClient.get(decoded.sub);

//     // if (!session) {
//     //   return next(new AppError(401, `Invalid token or session has expired`));
//     // }

//     // const session = await jwt.verify(decoded.sub, 'refreshTokenPublicKey');
//     // const session = await verifyJwt<{ sub: string }>(
//     //   access_token,
//     //   'accessTokenPublicKey'
//     // );
//     const session = await jwt.verify(access_token, 'accessTokenPublicKey');

//     if (!session) {
//       return next(new AppError(401, `Invalid token or session has expired`));
//     }

//     // Check if the user still exist
//     // const user = await findUserById(JSON.parse(session).id);
//     const user = await findUserById(decoded.sub as string);

//     if (!user) {
//       return next(new AppError(401, `Invalid token or session has expired`));
//     }

//     // Add user to res.locals
//     res.locals.user = user;

//     next();
//   } catch (err: any) {
//     next(err);
//   }
// };



// export const signTokens = async (user: User) => {
//   // 1. Create Session
//   // redisClient.set(user.id, JSON.stringify(user), {
//   //   EX: config.get<number>('redisCacheExpiresIn') * 60,
//   // });

//   // 2. Create Access and Refresh tokens
//   // const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
//   //   expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//   // });

//   // const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
//   //   expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
//   // });


//     // 2. Create Access and Refresh tokens
//     const access_token = jwt.sign({ sub: user.id }, config.get('accessTokenPrivateKey'), {
//       // expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//     expiresIn : `${time.accessTokenExpiresIn}m`,
//     });
  
//     const refresh_token = jwt.sign({ sub: user.id }, config.get('refreshTokenPrivateKey'), {
//       // expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
//     expiresIn : `${time.refreshTokenExpiresIn}m`,
//     });
  
  
//   return { access_token, refresh_token };
// };

// export const deserializeUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let access_token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       access_token = req.headers.authorization.split(' ')[1];
//     } else if (req.cookies.access_token) {
//       access_token = req.cookies.access_token;
//     }

//     if (!access_token) {
//       console.log('No access token provided');
//       return next(new AppError(401, 'You are not logged in'));
//     }

//     // Retrieve JWT public key from environment variables
//     const accessTokenPublicKey = process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY;
//     if (!accessTokenPublicKey) {
//       return next(new AppError(500, 'JWT public key not configured'));
//     }
//     console.log(access_token)
//     // Validate the access token
//     const decoded = jwt.verify(access_token, accessTokenPublicKey, { algorithms: ['RS256'] }) as { sub: string };
//     // console.log('Decoded Token:', decoded);
//     if (!decoded) {
//       return next(new AppError(401, `Invalid token or user doesn't exist`));
//     }

//     // Check if the user still exists
//     const user = await findUserById(decoded.sub);

//     if (!user) {
//       return next(new AppError(401, `User not found`));
//     }

//     // Add user to res.locals for use in subsequent middleware/routes
//     res.locals.user = user;

//     next();
//   } catch (err: any) {
//     // Handle JWT verification errors
//     console.error('Token verification failed:', err);
//     if (err.name === 'TokenExpiredError') {
//       return next(new AppError(401, 'Token has expired'));
//     } else if (err.name === 'JsonWebTokenError') {
//       return next(new AppError(401, 'Invalid token this is issue'));
//     }

//     next(err);
//   }
// };