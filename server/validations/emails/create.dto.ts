import { z } from 'zod';
import { mediaIdSchema } from '../base';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';

export const createEmailDto = z.object({
  subject: z.string().max(255),
  body: z.string(),
  sender: z.number().optional(),
  importanceLevel: z.nativeEnum(ImportanceLevel),
  isPredefined: z.boolean().default(false),
  medias: z.array(mediaIdSchema).optional(),
  recipients: z
    .object({
      to: z.array(z.number()),
      cc: z.array(z.number()),
      bcc: z.array(z.number()),
    })
    .optional(),
  groups: z
    .object({
      to: z.array(z.number()),
      cc: z.array(z.number()),
      bcc: z.array(z.number()),
    })
    .optional(),
});

export type CreateEmailDto = z.infer<typeof createEmailDto>;
