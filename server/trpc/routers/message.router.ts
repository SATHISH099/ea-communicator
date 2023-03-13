import { router, procedure } from '~/server/trpc/trpc';

export const message = router({
  getStatistics: procedure.query(() => {
    return ['Communicator'];
  }),
});
