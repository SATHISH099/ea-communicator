import { router, procedure } from '~/server/trpc/trpc';

export const app = router({
  title: procedure.query(() => {
    return 'Communicator';
  }),
});
