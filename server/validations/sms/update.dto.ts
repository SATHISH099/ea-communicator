import type { z } from 'zod';
import { createSmsDto } from './create.dto';

export const updateSmsDto = createSmsDto.partial();

export type UpdateSmsDto = z.infer<typeof updateSmsDto>;
