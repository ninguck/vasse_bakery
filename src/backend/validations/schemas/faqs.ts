import { z } from 'zod';

export const createFaqSchema = z.object({
  question: z.string().min(1, "Question is required").max(200, "Question must be less than 200 characters"),
  answer: z.string().min(1, "Answer is required").max(1000, "Answer must be less than 1000 characters"),
});

export const updateFaqSchema = createFaqSchema.partial();

export type CreateFaqRequest = z.infer<typeof createFaqSchema>;
export type UpdateFaqRequest = z.infer<typeof updateFaqSchema>; 