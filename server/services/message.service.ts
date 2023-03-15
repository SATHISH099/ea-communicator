import type { FindOneOptions } from 'typeorm';
import appDataSource from '../database/config/app.datasource';
import { MessageGroup } from '../database/entities/message/message-groups.entity';
import { MessageRecipient } from '../database/entities/message/message-recipients.entity';
import { Message } from '../database/entities/message/message.entity';
import { SendingStatus } from '../enums/sending-status.enum';
import { CreateMessageDto } from '../validations/messages/create.dto';
import { BaseService } from './base.service';
import { UserService } from './user.service';

export class MessageService extends BaseService<Message> {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
    this.repository = appDataSource.getRepository(Message);
  }

  findOne(
    id: number,
    overrideOptions?: FindOneOptions<Message>,
  ): Promise<Message> {
    return super.findOne(id, {
      ...overrideOptions,
      relations: {
        medias: true,
        recipients: true,
        groups: true,
      },
    });
  }

  async createMessage(body: CreateMessageDto) {
    const user = await this.userService.getLoginUser();
    const message = await super.create({
      ...body,
      tenantId: user.tenantId,
      creatorId: user,
      sendingStatus: SendingStatus.PENDING,
    });

    await Promise.all(
      body.recipients.map((recipient: any) => {
        const messageRecipient = new MessageRecipient();
        messageRecipient.messageId = message.id;
        messageRecipient.recipientId = recipient;

        return this.repository.manager.save(messageRecipient);
      }),
    );

    await Promise.all(
      body.groups.map((groups: any) => {
        const messageGroup = new MessageGroup();
        messageGroup.messageId = message.id;
        messageGroup.groupId = groups;

        return this.repository.manager.save(messageGroup);
      }),
    );

    return message;
  }

  delete(id: number) {
    return this.repository.softDelete(id);
  }
}
