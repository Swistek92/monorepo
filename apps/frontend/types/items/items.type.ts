import { z } from "zod"

// FRONTEND Schema
export const createItemSchema = z.object({
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

export type CreateItem = z.infer<typeof createItemSchema>

// FRONTEND Schema
export const createdItemSchema = z.object({
  id: z.number().int().positive(),
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
  ownerEmail: z.string().email().optional(),
})

export type CreatedItem = z.infer<typeof createdItemSchema>

// FRONTEND: DeleteItemResponse schema
export const deleteItemResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
})

export type DeleteItemResponse = z.infer<typeof deleteItemResponseSchema>

export const getAllItemsResponseSchema = z.object({
  items: z.array(createdItemSchema),
  total: z.number().int().min(0),
})

export type GetAllItemsResponse = z.infer<typeof getAllItemsResponseSchema>
export const updateItemSchema = createItemSchema.partial()

export type UpdateItem = z.infer<typeof updateItemSchema>
