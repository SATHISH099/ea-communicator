import { TRPCError, initTRPC } from '@trpc/server';
import { UserService } from '../services/user.service';
import type { Context } from '~/server/trpc/context';

const t = initTRPC.context<Context>().create();

export const procedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;

const isAuthenticated = middleware(async ({ ctx: { session }, next }) => {
  const userService = new UserService();
  if (
    !session.user?.id ||
    (await userService.getRespository().countBy({ id: session.user?.id })) < 1
  ) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

export const authProcedure = procedure.use(isAuthenticated);
