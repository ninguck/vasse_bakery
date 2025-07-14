import { z } from 'zod';

const allowedBadgeColors = [
  'caramel',
  'sage',
  'chocolate',
  'beige',
  'cream',
];

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  mainImageUrl: z.string().url("Valid image URL is required"),
  badgeText: z.string().optional(),
  badgeColor: z.enum(allowedBadgeColors).optional(),
  badgeIcon: z.string().optional(),
  categoryId: z.string().uuid("Invalid category ID format").optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductRequest = z.infer<typeof createProductSchema>;
export type UpdateProductRequest = z.infer<typeof updateProductSchema>; 