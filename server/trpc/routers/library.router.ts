import { Like } from 'typeorm';
import { z } from 'zod';
import { authProcedure, router } from '../trpc';
import { MediaService } from '~~/server/services/media.service';
import { queryListSchema } from '~~/server/validations/base';

const list = authProcedure.input(queryListSchema).query(({ ctx, input }) => {
  const service = new MediaService();
  service.setEvent(ctx);

  return service.findAll(input, {
    where: [
      {
        extension: Like(`%${input.search}%`),
      },
      {
        title: Like(`%${input.search}%`),
      },
    ],
  });
});

const deleteMedia = authProcedure.input(z.number()).mutation(({ input }) => {
  const service = new MediaService();

  return service.remove(input);
});

export const library = router({
  list,
  delete: deleteMedia,
});
