// src/items/dto/update-item.schema.ts
import { z } from "zod"
import { CreateItemSchema } from "@my-monorepo/consts"

export const UpdateItemSchema = CreateItemSchema.partial()

export type UpdateItemDto = z.infer<typeof UpdateItemSchema>
