import { Like } from 'typeorm';
import { z } from 'zod';
import { authProcedure, router } from '~/server/trpc/trpc';
import { MessageService } from '~~/server/services/message.service';
import { queryListSchema } from '~~/server/validations/base';
import { createMessageDto } from '~~/server/validations/messages/create.dto';

const list = authProcedure
  .input(z.object({}).merge(queryListSchema))
  .query(({ input }) => {
    const messageService = new MessageService();

    return messageService.findAll(input, {
      where: {
        ...(input.search && { title: Like(`%${input.search}%`) }),
      },
      relations: {
        sender: true,
        recipients: true,
        groups: true,
      },
    });
  });

const show = authProcedure.input(z.number()).query(({ input }) => {
  const messageService = new MessageService();
  return messageService.findOne(input);
});

const deleteMessage = authProcedure.input(z.number()).mutation(({ input }) => {
  const messageService = new MessageService();
  return messageService.delete(input);
});

const create = authProcedure
  .input(createMessageDto)
  .mutation(({ ctx, input }) => {
    const messageService = new MessageService();
    messageService.setEvent(ctx);
    return messageService.createMessage(input);
  });

const bulkDelete = authProcedure
  .input(z.array(z.number()))
  .mutation(({ input }) => {
    const messageService = new MessageService();
    return messageService.bulkDelete(input);
  });

export const message = router({
  show,
  list,
  delete: deleteMessage,
  create,
  bulkDelete,
});
