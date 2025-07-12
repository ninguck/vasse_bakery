import { z } from 'zod';

export const createMenuItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(300, "Description must be less than 300 characters"),
  price: z.number().positive("Price must be positive").min(0.01, "Price must be at least 0.01"),
  productId: z.string().uuid("Invalid product ID format").nullable().optional(),
  categoryId: z.string().uuid("Invalid category ID format").nullable().optional(),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();

export type CreateMenuItemRequest = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemRequest = z.infer<typeof updateMenuItemSchema>; 