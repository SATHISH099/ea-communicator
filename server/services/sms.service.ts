import type { FindOneOptions } from 'typeorm';
import appDataSource from '../database/config/app.datasource';
import { SmsGroup } from '../database/entities/sms/sms-groups.entity';
import { SmsRecipient } from '../database/entities/sms/sms-recipients.entity';
import { Sms } from '../database/entities/sms/sms.entity';
import type { CreateSmsDto } from '../validations/sms/create.dto';
import { SendingStatus } from '../enums/sending-status.enum';
import { BaseService } from './base.service';
import { UserService } from './user.service';

export class SmsService extends BaseService<Sms> {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
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

  async createSms(body: CreateSmsDto) {
    const user = await this.userService.getLoginUser();
    const { recipients, groups, ...smsObject } = body;
    const sms = await super.create({
      ...smsObject,
      tenantId: user.tenantId,
      creator: user,
      sender: user,
      sendingStatus: SendingStatus.PENDING,
    });

    if (!body.isPredefined) {
      await Promise.all(
        recipients.map((recipient: any) => {
          const smsRecipient = new SmsRecipient();
          smsRecipient.smsId = sms.id;
          smsRecipient.recipientId = recipient;

          return this.repository.manager.save(smsRecipient);
        }),
      );

      await Promise.all(
        groups.map((groups: any) => {
          const smsGroup = new SmsGroup();
          smsGroup.smsId = sms.id;
          smsGroup.groupId = groups;

          return this.repository.manager.save(smsGroup);
        }),
      );
    }

    return sms;
  }

  delete(id: number) {
    return this.repository.softDelete(id);
  }

  bulkDelete(ids: number[]) {
    return this.repository.softDelete(ids);
  }
}
