import { procedure, router } from '~/server/trpc/trpc';

export const media = router({
  getStatistics: procedure.query(() => {
    return ['Communicator'];
  }),
});
