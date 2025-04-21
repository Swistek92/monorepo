import { z } from 'zod';

export const PaginationSchema = z.object({
  skip: z.coerce.number().positive().optional(),
  limit: z.coerce.number().positive().optional(),
});

export type PaginationDTO = z.infer<typeof PaginationSchema>;
