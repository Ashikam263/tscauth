// src/routes/solution.routes.ts
import express from 'express';
import { createSolutionHandler, getSolutionByIdHandler, getAllSolutionsHandler, updateSolutionHandler, deleteSolutionHandler } from '../controllers/solution.controller';
import { validate } from '../middleware/validate';
import { createSolutionSchema } from '../schemas/solution.schema';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { isUser } from '../middleware/roleCheck';

const router = express.Router();

router.post('/', deserializeUser, requireUser, validate(createSolutionSchema), createSolutionHandler);
router.get('/:id', deserializeUser, requireUser, getSolutionByIdHandler);
router.get('/', deserializeUser, requireUser, getAllSolutionsHandler);
router.put('/:id', deserializeUser, requireUser, validate(createSolutionSchema), updateSolutionHandler); // Update solution route
router.delete('/:id', deserializeUser, requireUser, deleteSolutionHandler); // Delete solution route
router.get('/', isUser, getAllSolutionsHandler);// Only regular users can access this route


export default router;
