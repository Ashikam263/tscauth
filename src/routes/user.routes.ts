import express from 'express';
import { getMeHandler, getUserByIdHandler, getUsersHandler, createUserHandler } from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createUserSchema } from '../schemas/user.schema';
import { isAdmin } from '../middleware/roleCheck'; // Import isAdmin middleware

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', getMeHandler);

// Only admin can create users
router.post('/', isAdmin, validate(createUserSchema), createUserHandler);

// Regular users cannot access these routes
router.get('/:id', isAdmin, getUserByIdHandler);
router.get('/', isAdmin, getUsersHandler);

export default router;
