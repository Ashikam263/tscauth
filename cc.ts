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

