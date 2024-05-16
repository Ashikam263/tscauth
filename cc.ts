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