
import express from 'express';
import {createUserHandler, getMeHandler, getUserByIdHandler, getUsersHandler } from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createUserSchema } from '../schemas/user.schema';
import { isAdmin } from '../middleware/roleCheck';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', getMeHandler);
router.post('/', validate(createUserSchema), createUserHandler);
router.get('/:id', getUserByIdHandler);
router.get('/', isAdmin, getUsersHandler);

export default router;
