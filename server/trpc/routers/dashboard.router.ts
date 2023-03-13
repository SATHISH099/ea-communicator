import { router, procedure } from '~/server/trpc/trpc';

export const dashboard = router({
  getStatistics: procedure.query(() => {
    return ['Communicator'];
  }),
});
