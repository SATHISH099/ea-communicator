import { z } from 'zod';
import { AuthService } from '~~/server/services/auth.service';
import { procedure, router } from '~~/server/trpc/trpc';
import type { AuthSessionPayload } from '~~/server/types';

const login = procedure
  .input(z.string())
  .mutation(async ({ input, ctx: { session } }) => {
    const service = new AuthService();

    const loginResponse = await service.login(input, session);
    return {
      token: loginResponse.token,
      user: {
        ...(session.user as AuthSessionPayload),
      },
    };
  });

const logout = procedure.mutation(({ ctx: { session } }) => {
  const service = new AuthService();

  return service.logout(session);
});

export const auth = router({
  login,
  logout,
});
