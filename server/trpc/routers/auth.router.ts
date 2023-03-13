import { z } from 'zod';
import { router, procedure } from '~~/server/trpc/trpc';

const login = procedure
  .input(
    z.object({
      email: z.string().min(1),
      password: z.string().min(1),
    }),
  )
  .mutation(async ({ input: { email, password }, ctx: { session } }) => {
    return [];
  });

const logout = procedure.mutation(({ ctx: { session } }) => {
  session.userId = undefined;
  return true;
});

export const auth = router({
  login,
  logout,
});
