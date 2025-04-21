// src/items/dto/get-all-items.schema.ts
import { z } from "zod"
import { CreatedItemSchema } from "@my-monorepo/consts"

const GetAllItemsResponseSchema = z.object({
  items: z.array(CreatedItemSchema),
  total: z.number().int().nonnegative(),
})

export type GetAllItemsResponse = z.infer<typeof GetAllItemsResponseSchema>
