import { CreateItemSchema } from "./create-item.schema"
import { z } from "zod"

// Rozszerzamy istniejący schema o pole id
export const CreatedItemSchema = CreateItemSchema.extend({
  id: z.number().int().positive(),
  ownerEmail: z.string().email().optional(), // 👈 Dodane
})

export type CreatedItemDto = z.infer<typeof CreatedItemSchema>
export type CreateItemDto = z.infer<typeof CreateItemSchema>
