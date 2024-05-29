// src/controllers/solution.controller.ts
import { Request, Response } from 'express';
import { createSolution, findSolutionById, findAllSolutions, updateSolution, deleteSolution } from '../services/solution.service';
import { CreateSolutionInput } from '../schemas/solution.schema';

export const createSolutionHandler = async (req: Request<any, any, CreateSolutionInput>, res: Response) => {
  try {
    const { title, description } = req.body;

    const solution = await createSolution({ title, description });

    res.status(201).json({
      status: 'success',
      data: {
        solution,
      },
    });
  } catch (error) {
    console.error('Error creating solution:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export const getSolutionByIdHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const solution = await findSolutionById(id);

    if (!solution) {
      return res.status(404).json({
        status: 'fail',
        message: 'Solution not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        solution,
      },
    });
  } catch (error) {
    console.error('Error getting solution by ID:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export const getAllSolutionsHandler = async (req: Request, res: Response) => {
  try {
    const solutions = await findAllSolutions();

    res.status(200).json({
      status: 'success',
      data: {
        solutions,
      },
    });
  } catch (error) {
    console.error('Error getting all solutions:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export const updateSolutionHandler = async (req: Request<{ id: string }, any, CreateSolutionInput>, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedSolution = await updateSolution(id, { title, description });

    res.status(200).json({
      status: 'success',
      data: {
        solution: updatedSolution,
      },
    });
  } catch (error) {
    console.error('Error updating solution:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export const deleteSolutionHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    await deleteSolution(id);

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting solution:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};