// src/items/dto/create-item.schema.ts
import { z } from "zod"

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
  rating: z.number().min(0).max(5).optional().default(0),
  views: z.number().int().min(0).optional().default(0),
})
