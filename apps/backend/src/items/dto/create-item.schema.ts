// src/items/dto/create-item.schema.ts
import { z } from 'zod';

export const CreateItemSchema = z.object({
  name: z.string(),
  image: z.string().url(),
  price: z.number().min(0),
  description: z.string(),
  createdAt: z.coerce.date(),
  category: z.string(),
  available: z.boolean().optional().default(true),
  tags: z.array(z.string()),
  location: z.string(),
  ownerId: z.number().int().positive(),
});

export type CreateItemDto = z.infer<typeof CreateItemSchema>;
