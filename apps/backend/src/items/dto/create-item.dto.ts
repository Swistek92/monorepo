import { CreateItemSchema } from './create-item.schema';
import { z } from 'zod';

export type CreateItemDto = z.infer<typeof CreateItemSchema>;
