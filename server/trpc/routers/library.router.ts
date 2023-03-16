import { Like } from 'typeorm';
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { MediaService } from '~~/server/services/media.service';
import { queryListSchema } from '~~/server/validations/base';

const list = procedure.input(queryListSchema).query(({ input }) => {
  const service = new MediaService();

  return service.findAll(input, {
    where: {
      ...(input.search && { title: Like(`%${input.search}%`) }),
    },
  });
});

const deleteMedia = procedure.input(z.number()).mutation(({ input }) => {
  const service = new MediaService();

  return service.remove(input);
});

export const library = router({
  list,
  delete: deleteMedia,
});
