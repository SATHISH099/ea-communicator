import { router, procedure } from '~/server/trpc/trpc';

export const sms = router({
  getStatistics: procedure.query(() => {
    return ['Communicator'];
  }),
});
