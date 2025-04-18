// src/items/dto/update-item.schema.ts
import { z } from 'zod';
import { CreateItemSchema } from './create-item.schema';

export const UpdateItemSchema = CreateItemSchema.partial();

export type UpdateItemDto = z.infer<typeof UpdateItemSchema>;
