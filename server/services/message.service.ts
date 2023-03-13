import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { MessageGroup } from '../database/entities/message/message-groups.entity';
import { MessageRecipient } from '../database/entities/message/message-recipients.entity';
import { Message } from '../database/entities/message/message.entity';
import { SendingStatus } from '../enums/sending-status.enum';
import { BaseService } from './base.service';
import { UserService } from './user.service';

export class MessageService extends BaseService<Message> {
  constructor(
    protected repository: Repository<Message>,
    private userService: UserService,
  ) {
    super();
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

  async create(body: DeepPartial<Message>) {
    const { tenantId, id } = await this.userService.getLoginUser();

    const message = await super.create({
      ...body,
      tenantId: tenantId,
      creatorId: { id },
      sendingStatus: SendingStatus.PENDING,
    });

    await Promise.all(
      body.recipients.map(async (recipient: any) => {
        const messageRecipient = new MessageRecipient();
        messageRecipient.messageId = message.id;
        messageRecipient.recipientId = recipient.recipientId;

        return this.repository.manager.save(messageRecipient);
      }),
    );

    await Promise.all(
      body.groups.map(async (groups: any) => {
        const messageGroup = new MessageGroup();
        messageGroup.messageId = message.id;
        messageGroup.groupId = groups.groupId;

        return this.repository.manager.save(messageGroup);
      }),
    );

    return message;
  }

  async delete(id: number) {
    return this.repository.softDelete(id);
  }
}
