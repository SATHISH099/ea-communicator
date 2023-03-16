import { z } from 'zod';
import { AuthService } from '~~/server/services/auth.service';
import { procedure, router } from '~~/server/trpc/trpc';

const login = procedure
  .input(z.string())
  .mutation(({ input, ctx: { session } }) => {
    const service = new AuthService();

    return service.login(input, session!);
  });

const logout = procedure.mutation(({ ctx: { session } }) => {
  session!.userId = undefined;
  return true;
});

export const auth = router({
  login,
  logout,
});
