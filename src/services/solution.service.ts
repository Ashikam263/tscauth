// src/services/solution.service.ts
import { DeepPartial } from 'typeorm';
import { Solution } from '../entities/solution.entity';
import { AppDataSource } from '../utils/data-source';

const solutionRepository = AppDataSource.getRepository(Solution);

export const createSolution = async (input: DeepPartial<Solution>) => {
  const solution = solutionRepository.create(input);
  return await solutionRepository.save(solution);
};

export const findSolutionById = async (solutionId: string) => {
  return await solutionRepository.findOneBy({ id: solutionId });
};

export const findAllSolutions = async () => {
  return await solutionRepository.find();
};

export const updateSolution = async (solutionId: string, updates: DeepPartial<Solution>) => {
  const existingSolution = await solutionRepository.findOneBy({ id: solutionId });
  if (!existingSolution) {
    throw new Error('Solution not found');
  }

  Object.assign(existingSolution, updates);
  return await solutionRepository.save(existingSolution);
};

export const deleteSolution = async (solutionId: string) => {
  const existingSolution = await solutionRepository.findOneBy({ id: solutionId });
  if (!existingSolution) {
    throw new Error('Solution not found');
  }

  return await solutionRepository.delete(existingSolution);
};
