import { TRPCError } from '@trpc/server';
import { middleware, procedure, router } from '~~/server/trpc/trpc';
import { UserService } from '~~/server/services/user.service';

const isAuthenticated = middleware(async ({ ctx, next }) => {
  const userService = new UserService();
  if (
    !ctx.session.user?.id ||
    (await userService.getRespository().countBy({ id: ctx.session.user?.id })) <
      1
  ) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

const me = procedure.use(isAuthenticated).query(({ ctx: { session } }) => {
  const userService = new UserService();
  return userService.findOne(session.user?.id);
});

const check = procedure.query(async ({ ctx }) => {
  if (!ctx.session?.user?.id) {
    return false;
  }

  const userService = new UserService();
  const userCount = await userService
    .getRespository()
    .countBy({ id: ctx.session.user?.id });

  return userCount > 0;
});

export const profile = router({
  me,
  check,
});
