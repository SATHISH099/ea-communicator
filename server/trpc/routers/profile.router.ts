import { authProcedure, procedure, router } from '~~/server/trpc/trpc';
import { UserService } from '~~/server/services/user.service';

const me = authProcedure.query(({ ctx: { session } }) => {
  const userService = new UserService();
  return userService.findOne(session!.user?.id);
});

const check = procedure.query(async ({ ctx }) => {
  if (!ctx.session.user?.id) {
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
