import { router, procedure } from '~/server/trpc/trpc';

export const email = router({
  getStatistics: procedure.query(() => {
    return ['Communicator'];
  }),
});
