import { defineStore } from 'pinia';
import { z } from 'zod';

export const authUserSchema = z.object({
  id: z.number(),
  userId: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.boolean(),
  roles: z.array(z.string()),
  tokenId: z.number(),
  tenantId: z.number(),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export const useAuthUser = defineStore('auth-user', {});
