import { z } from "zod"
import { CategoryEnum } from "@my-monorepo/consts"

// konwersja enuma do literal union
const categoryEnumSchema = z.nativeEnum(CategoryEnum)

// CREATE: Nowy przedmiot
export const createItemSchema = z.object({
  name: z.string(),
  image: z.string().url().optional(),
  isAuction: z.boolean(),
  startingPrice: z.number().min(0),
  buyNowPrice: z.number().min(0).nullable().optional(),
  quantity: z.number().int().min(1),
  auctionEndDate: z.coerce.date(),
  description: z.string(),
  category: categoryEnumSchema, // ✅ enum jako walidacja
  tags: z.array(z.string()),
  location: z.string(),
})

export type CreateItem = z.infer<typeof createItemSchema>

// READ: Otrzymany przedmiot
export const createdItemSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  image: z.string().url(),
  isAuction: z.boolean(),
  startingPrice: z.number().min(0),
  buyNowPrice: z.number().nullable().optional(),
  quantity: z.number().int().min(1),
  auctionEndDate: z.coerce.date(),
  description: z.string(),
  createdAt: z.coerce.date(),
  category: categoryEnumSchema, // ✅ enum tutaj też
  available: z.boolean().optional().default(true),
  tags: z.array(z.string()),
  location: z.string(),
  ownerId: z.number().int().positive(),
  rating: z.number().min(0).max(5).default(0),
  views: z.number().int().min(0).default(0),
})

export type CreatedItem = z.infer<typeof createdItemSchema>

// UPDATE: Częściowa aktualizacja
export const updateItemSchema = createItemSchema.partial()

export type UpdateItem = z.infer<typeof updateItemSchema>

// DELETE: Odpowiedź na usunięcie
export const deleteItemResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
})

export type DeleteItemResponse = z.infer<typeof deleteItemResponseSchema>

// GET ALL: Odpowiedź na pobranie listy
export const getAllItemsResponseSchema = z.object({
  items: z.array(createdItemSchema),
  total: z.number().int().min(0),
})

export type GetAllItemsResponse = z.infer<typeof getAllItemsResponseSchema>
