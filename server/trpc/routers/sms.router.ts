import { Like } from 'typeorm';
import { z } from 'zod';
import { authProcedure, router } from '~/server/trpc/trpc';
import { SmsService } from '~~/server/services/sms.service';
import { queryListSchema } from '~~/server/validations/base';
import { createSmsDto } from '~~/server/validations/sms/create.dto';
import { updateSmsDto } from '~~/server/validations/sms/update.dto';

const list = authProcedure
  .input(
    z
      .object({
        isPredefined: z.boolean().default(false),
      })
      .merge(queryListSchema),
  )
  .query(({ ctx, input }) => {
    const smsService = new SmsService();
    smsService.setEvent(ctx);
    const isPredefinedCond = { isPredefined: input.isPredefined };

    return smsService.findAll(input, {
      where: [
        { title: Like(`%${input.search}%`), ...isPredefinedCond },
        { message: Like(`%${input.search}%`), ...isPredefinedCond },
        {
          sender: [{ name: Like(`%${input.search}%`) }],
          ...isPredefinedCond,
        },
      ],
      relations: {
        sender: true,
        recipients: true,
        groups: true,
      },
    });
  });

const deleteSms = authProcedure.input(z.number()).mutation(({ input }) => {
  const smsService = new SmsService();
  return smsService.delete(input);
});

const show = authProcedure.input(z.number()).query(({ input }) => {
  const smsService = new SmsService();
  return smsService.findOne(input);
});

const create = authProcedure.input(createSmsDto).mutation(({ ctx, input }) => {
  const smsService = new SmsService();
  smsService.setEvent(ctx);
  return smsService.createSms(input);
});

const update = authProcedure
  .input(
    z.object({
      id: z.number(),
      data: updateSmsDto,
    }),
  )
  .mutation(({ input: { id, data } }) => {
    const service = new SmsService();
    return service.updateSms(id, data);
  });

const bulkDelete = authProcedure
  .input(z.array(z.number()))
  .mutation(({ input }) => {
    const smsService = new SmsService();
    return smsService.bulkDelete(input);
  });

export const sms = router({
  list,
  show,
  delete: deleteSms,
  create,
  update,
  bulkDelete,
});
