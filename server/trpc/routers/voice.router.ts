import { procedure, router } from '~/server/trpc/trpc';

export const voice = router({
  getStatistics: procedure.query(() => {
    return ['Communicator'];
  }),
});
