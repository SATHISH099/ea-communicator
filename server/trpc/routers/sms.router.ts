import { Between, ILike } from 'typeorm';
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
  .query(async ({ ctx, input }) => {
    const smsService = new SmsService();
    smsService.setEvent(ctx);
    const user = await getCurrentUser(ctx);
    const isPredefinedCond = {
      isPredefined: input.isPredefined,
      tenantId: user.tenantId,
      ...(input.startDate &&
        input.endDate && {
          createdAt: Between(input.startDate, input.endDate),
        }),
    };

    return smsService.findAll(input, {
      where: [
        { title: ILike(`%${input.search}%`), ...isPredefinedCond },
        { message: ILike(`%${input.search}%`), ...isPredefinedCond },
        {
          sender: [{ name: ILike(`%${input.search}%`) }],
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

const show = authProcedure.input(z.number()).query(({ ctx, input }) => {
  const smsService = new SmsService();
  smsService.setEvent(ctx);
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
  .mutation(({ ctx, input: { id, data } }) => {
    const service = new SmsService();
    service.setEvent(ctx);
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
