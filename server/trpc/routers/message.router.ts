import { Like } from 'typeorm';
import { z } from 'zod';
import { procedure, router } from '~/server/trpc/trpc';
import { MessageService } from '~~/server/services/message.service';
import { queryListSchema } from '~~/server/validations/base';
import { createMessageDto } from '~~/server/validations/messages/create.dto';

const findAll = procedure
  .input(z.object({}).merge(queryListSchema))
  .query(({ input }) => {
    const messageService = new MessageService();

    return messageService.findAll(input, {
      where: {
        ...(input.search && { title: Like(`%${input.search}%`) }),
      },
      relations: {
        recipients: true,
        groups: true,
      },
    });
  });

const show = procedure.input(z.number()).query(({ input }) => {
  const messageService = new MessageService();
  return messageService.findOne(input);
});

const deleteMessage = procedure.input(z.number()).mutation(({ input }) => {
  const messageService = new MessageService();
  return messageService.delete(input);
});

const create = procedure.input(createMessageDto).mutation(({ input }) => {
  const messageService = new MessageService();
  return messageService.createMessage(input);
});

const bulkDelete = procedure
  .input(z.array(z.number()))
  .mutation(({ input }) => {
    const messageService = new MessageService();
    return messageService.bulkDelete(input);
  });

export const message = router({
  show,
  findAll,
  delete: deleteMessage,
  create,
  bulkDelete,
});
