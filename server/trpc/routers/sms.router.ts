import { Like } from 'typeorm';
import { z } from 'zod';
import { procedure, router } from '~/server/trpc/trpc';
import { SmsService } from '~~/server/services/sms.service';
import { queryListSchema } from '~~/server/validations/base';
import { createSmsDto } from '~~/server/validations/sms/create.dto';

const list = procedure
  .input(
    z
      .object({
        isPredefined: z.boolean().default(false),
      })
      .merge(queryListSchema),
  )
  .query(({ input }) => {
    const smsService = new SmsService();

    return smsService.findAll(input, {
      where: {
        ...(input.search && { title: Like(`%${input.search}%`) }),
        isPredefined: input.isPredefined,
      },
      relations: {
        recipients: true,
        groups: true,
      },
    });
  });

const deleteSms = procedure.input(z.number()).mutation(({ input }) => {
  const smsService = new SmsService();
  return smsService.delete(input);
});

const show = procedure.input(z.number()).query(({ input }) => {
  const smsService = new SmsService();
  return smsService.findOne(input);
});

const create = procedure.input(createSmsDto).mutation(({ input }) => {
  const smsService = new SmsService();
  return smsService.createSms(input);
});

const bulkDelete = procedure
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
  bulkDelete,
});
