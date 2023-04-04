import { ILike } from 'typeorm';
import { z } from 'zod';
import { authProcedure, router } from '../trpc';
import { MediaService } from '~~/server/services/media.service';
import { queryListSchema } from '~~/server/validations/base';

const list = authProcedure
  .input(queryListSchema)
  .query(async ({ ctx, input }) => {
    const service = new MediaService();
    service.setEvent(ctx);
    const user = await getCurrentUser(ctx);

    const tenantId = {
      tenantId: user.tenantId,
    };

    return service.findAll(input, {
      where: [
        {
          extension: ILike(`%${input.search}%`),
          ...tenantId,
        },
        {
          title: ILike(`%${input.search}%`),
          ...tenantId,
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
