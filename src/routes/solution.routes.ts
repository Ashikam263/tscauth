// src/routes/solution.route.ts
import express from 'express';
import { createSolutionHandler, getSolutionByIdHandler, getAllSolutionsHandler, updateSolutionHandler, deleteSolutionHandler } from '../controllers/solution.controller';
import { validate } from '../middleware/validate';
import { createSolutionSchema } from '../schemas/solution.schema';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { isAdmin } from '../middleware/roleCheck';

const router = express.Router();

router.post('/', deserializeUser, requireUser, isAdmin, validate(createSolutionSchema), createSolutionHandler);
router.get('/:id', deserializeUser, requireUser, getSolutionByIdHandler);
router.get('/', deserializeUser, requireUser, getAllSolutionsHandler);
router.put('/:id', deserializeUser, requireUser, isAdmin, validate(createSolutionSchema), updateSolutionHandler);
router.delete('/:id', deserializeUser, requireUser, isAdmin, deleteSolutionHandler);

export default router;
