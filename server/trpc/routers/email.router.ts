import { ILike } from 'typeorm';
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
  .query(async ({ ctx, input }) => {
    const emailService = new EmailService();
    emailService.setEvent(ctx);
    const user = await getCurrentUser(ctx);
    const isPredefinedCond = {
      isPredefined: input.isPredefined,
      tenantId: user.tenantId,
    };

    return emailService.findAll(input, {
      where: [
        { subject: ILike(`%${input.search}%`), ...isPredefinedCond },
        { body: ILike(`%${input.search}%`), ...isPredefinedCond },
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
  .mutation(({ ctx, input: { id, data } }) => {
    const emailService = new EmailService();
    emailService.setEvent(ctx);
    return emailService.updateEmail(id, data);
  });

const create = authProcedure
  .input(createEmailDto)
  .mutation(({ ctx, input }) => {
    const emailService = new EmailService();
    emailService.setEvent(ctx);

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
