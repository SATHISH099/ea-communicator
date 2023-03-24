import { Like } from 'typeorm';
import { z } from 'zod';
import { authProcedure, router } from '~/server/trpc/trpc';
import { EmailService } from '~~/server/services/email.service';
import { queryListSchema } from '~~/server/validations/base';
import { createEmailDto } from '~~/server/validations/emails/create.dto';
import { updateEmailDto } from '~~/server/validations/emails/update.dto';

const list = authProcedure
  .input(
    z
      .object({
        isPredefined: z.boolean().default(false),
      })
      .merge(queryListSchema),
  )
  .query(({ input }) => {
    const emailService = new EmailService();
    const isPredefinedCond = { isPredefined: input.isPredefined };

    return emailService.findAll(input, {
      where: [
        { subject: Like(`%${input.search}%`), ...isPredefinedCond },
        { body: Like(`%${input.search}%`), ...isPredefinedCond },
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

const deleteEmail = authProcedure.input(z.number()).mutation(({ input }) => {
  const emailService = new EmailService();
  return emailService.delete(input);
});

const show = authProcedure.input(z.number()).query(({ input }) => {
  const emailService = new EmailService();
  return emailService.findOne(input);
});

const update = authProcedure
  .input(
    z.object({
      id: z.number(),
      data: updateEmailDto,
    }),
  )
  .mutation(({ input: { id, data } }) => {
    const emailService = new EmailService();
    return emailService.updateEmail(id, data);
  });

const create = authProcedure.input(createEmailDto).mutation(({ input }) => {
  const emailService = new EmailService();
  return emailService.createEmail(input);
});

const bulkDelete = authProcedure
  .input(z.array(z.number()))
  .mutation(({ input }) => {
    const emailService = new EmailService();
    return emailService.bulkDelete(input);
  });

export const email = router({
  list,
  show,
  update,
  delete: deleteEmail,
  create,
  bulkDelete,
});
