import { router, procedure } from '~/server/trpc/trpc';

export const media = router({
  getStatistics: procedure.query(() => {
    return ['Communicator'];
  }),
});
