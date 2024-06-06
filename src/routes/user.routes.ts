import express from 'express';
import { getMeHandler, getUserByIdHandler, getUsersHandler, createUserHandler } from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createUserSchema } from '../schemas/user.schema';
import { isAdmin } from '../middleware/roleCheck';
import { authorize } from '../middleware/authorize';

const router = express.Router();

router.use(deserializeUser, requireUser);
// router.use(requireUser);

// Protected route - requires authentication and specific role
router.get('/', authorize('admin'), getUsersHandler);

// Get currently logged in user
router.get('/me', getMeHandler);

// Only admin can create users
// router.post('/', isAdmin, validate(createUserSchema), createUserHandler);

// Regular users cannot access these routes
router.get('/:id', isAdmin, getUserByIdHandler);
router.get('/', isAdmin, getUsersHandler);

export default router;
