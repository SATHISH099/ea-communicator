import type { DeepPartial, FindOneOptions } from 'typeorm';
import appDataSource from '../database/config/app.datasource';
import { SmsGroup } from '../database/entities/sms/sms-groups.entity';
import { SmsRecipient } from '../database/entities/sms/sms-recipients.entity';
import { Sms } from '../database/entities/sms/sms.entity';
import { CreateSmsDto } from '../dtos/sms/create-sms.dto';
import { SendingStatus } from '../enums/sending-status.enum';
import { BaseService } from './base.service';
import type { UserService } from './user.service';

export class SmsService extends BaseService<Sms> {
  constructor(private userService: UserService) {
    super();
    this.repository = appDataSource.getRepository(Sms);
  }

  findOne(id: number, overrideOptions?: FindOneOptions<Sms>): Promise<Sms> {
    return super.findOne(id, {
      ...overrideOptions,
      relations: {
        recipients: true,
        groups: true,
      },
    });
  }

  async create(body: CreateSmsDto) {
    const { tenantId, id } = await this.userService.getLoginUser();

    const sms = await super.create({
      ...body,
      tenantId,
      creatorId: { id },
      sendingStatus: SendingStatus.PENDING,
    });

    await Promise.all(
      body.recipients.map((recipient: any) => {
        const smsRecipient = new SmsRecipient();
        smsRecipient.smsId = sms.id;
        smsRecipient.recipientId = recipient.recipientId;

        return this.repository.manager.save(smsRecipient);
      }),
    );

    await Promise.all(
      body.groups.map((groups: any) => {
        const smsGroup = new SmsGroup();
        smsGroup.smsId = sms.id;
        smsGroup.groupId = groups.groupId;

        return this.repository.manager.save(smsGroup);
      }),
    );

    return sms;
  }

  delete(id: number) {
    return this.repository.softDelete(id);
  }
}
