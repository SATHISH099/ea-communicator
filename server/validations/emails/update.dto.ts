import type { z } from 'zod';
import { createEmailDto } from './create.dto';

export const updateEmailDto = createEmailDto.partial();

export type UpdateEmailDto = z.infer<typeof updateEmailDto>;
