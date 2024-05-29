// solution.schema.ts
import { object, string } from 'zod';

export const createSolutionSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
  }),
});

export type CreateSolutionInput = {
  title: string;
  description: string;
};
