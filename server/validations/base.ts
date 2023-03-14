import { z } from 'zod';

export const queryListSchema = z.object({
  pageNumber: z.number().default(1),
  pageSize: z.number().default(10),
  orderBy: z.string().default('createdAt'),
  orderType: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().optional(),
});

export type QueryList = z.infer<typeof queryListSchema>;
