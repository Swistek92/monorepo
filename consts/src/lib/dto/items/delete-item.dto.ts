// src/items/dto/delete-item-response.schema.ts
import { z } from "zod"

const DeleteItemResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
})

export type DeleteItemResponse = z.infer<typeof DeleteItemResponseSchema>
