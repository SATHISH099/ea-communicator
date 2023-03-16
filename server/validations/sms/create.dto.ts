import { z } from 'zod';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';

export const createSmsDto = z.object({
  title: z.string().max(255),
  message: z.string(),
  sender: z.number().optional(),
  importanceLevel: z.nativeEnum(ImportanceLevel),
  isPredefined: z.boolean().default(false),
  recipients: z.array(z.number()).optional(),
  groups: z.array(z.number()).optional(),
});

export type CreateSmsDto = z.infer<typeof createSmsDto>;
