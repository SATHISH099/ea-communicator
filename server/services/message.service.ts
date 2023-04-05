import type { FindOneOptions } from 'typeorm';
import appDataSource from '../database/config/app.datasource';
import { MessageGroup } from '../database/entities/message/message-groups.entity';
import { MessageRecipient } from '../database/entities/message/message-recipients.entity';
import { Message } from '../database/entities/message/message.entity';
import { SendingStatus } from '../enums/sending-status.enum';
import Queue from '../utils/queue';
import type { CreateMessageDto } from '../validations/messages/create.dto';
import { BaseService } from './base.service';

export class MessageService extends BaseService<Message> {
  constructor() {
    super();
    this.repository = appDataSource.getRepository(Message);
  }

  async findOne(
    id: number,
    overrideOptions?: FindOneOptions<Message>,
  ): Promise<Message> {
    const user = await getCurrentUser(this.event);

    return super.findOne(id, {
      ...overrideOptions,
      where: {
        tenantId: user.tenantId,
      },
      relations: {
        sender: true,
        medias: true,
        recipients: true,
        groups: true,
      },
    });
  }

  async createMessage(body: CreateMessageDto) {
    const user = await getCurrentUser(this.event);
    const sender = user;
    const { recipients, groups, ...messageObject } = body;

    const message = await super.create({
      ...messageObject,
      sender,
      tenantId: user.tenantId,
      creatorId: user,
      sendingStatus: SendingStatus.PENDING,
    });

    await Promise.all(
      recipients.map((recipient: any) => {
        const messageRecipient = new MessageRecipient();
        messageRecipient.messageId = message.id;
        messageRecipient.recipientId = recipient;

        return this.repository.manager.save(messageRecipient);
      }),
    );

    await Promise.all(
      groups.map((groups: any) => {
        const messageGroup = new MessageGroup();
        messageGroup.messageId = message.id;
        messageGroup.groupId = groups;

        return this.repository.manager.save(messageGroup);
      }),
    );

    Queue.enqueue(() => this.sendMessage(message.id));

    return message;
  }

  async sendMessage(msgId: number) {
    const config = useRuntimeConfig();
    console.log('processing', { msgId });

    if (config.functionMessage) {
      await $fetch(config.functionMessage, {
        params: {
          id: msgId,
        },
        onRequestError(context) {
          console.warn('error sending message', context.error);
        },
      });

      console.log('processed', { msgId });
    }
  }

  delete(id: number) {
    return this.repository.softDelete(id);
  }

  bulkDelete(ids: number[]) {
    return this.repository.softDelete(ids);
  }
}
