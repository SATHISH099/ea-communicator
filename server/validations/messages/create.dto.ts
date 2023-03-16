import { z } from 'zod';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';

export const createMessageDto = z
  .object({
    title: z.string(),
    message: z.string().nonempty(),
    isSms: z.boolean(),
    isVoice: z.boolean(),
    isEmail: z.boolean(),
    importanceLevel: z.nativeEnum(ImportanceLevel),
    isPredefined: z.boolean().default(false),
    recipients: z.array(z.number()),
    groups: z.array(z.number()),
  })
  .refine(
    (data) => data.isSms || data.isVoice || data.isEmail,
    'Either sms, voice or email should be checked.',
  );

export type CreateMessageDto = z.infer<typeof createMessageDto>;
