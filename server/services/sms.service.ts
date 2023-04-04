import type { FindOneOptions } from 'typeorm';
import _ from 'lodash';
import appDataSource from '../database/config/app.datasource';
import { SmsGroup } from '../database/entities/sms/sms-groups.entity';
import { SmsRecipient } from '../database/entities/sms/sms-recipients.entity';
import { Sms } from '../database/entities/sms/sms.entity';
import type { CreateSmsDto } from '../validations/sms/create.dto';
import { SendingStatus } from '../enums/sending-status.enum';
import type { UpdateSmsDto } from '../validations/sms/update.dto';
import { BaseService } from './base.service';
import { UserService } from './user.service';

export class SmsService extends BaseService<Sms> {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
    this.repository = appDataSource.getRepository(Sms);
  }

  async findOne(
    id: number,
    overrideOptions?: FindOneOptions<Sms>,
  ): Promise<Sms> {
    const user = await getCurrentUser(this.event);

    return super.findOne(id, {
      ...overrideOptions,
      where: {
        tenantId: user.tenantId,
      },
      relations: {
        sender: true,
        recipients: true,
        groups: true,
      },
    });
  }

  async createSms(body: CreateSmsDto) {
    const user = await getCurrentUser(this.event);
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
        recipients!.map((recipient: any) => {
          const smsRecipient = new SmsRecipient();
          smsRecipient.smsId = sms.id;
          smsRecipient.recipientId = recipient;

          return this.repository.manager.save(smsRecipient);
        }),
      );

      await Promise.all(
        groups!.map((groups: any) => {
          const smsGroup = new SmsGroup();
          smsGroup.smsId = sms.id;
          smsGroup.groupId = groups;

          return this.repository.manager.save(smsGroup);
        }),
      );
    }

    return sms;
  }

  updateSms(id: number, body: UpdateSmsDto) {
    return super.update(id, _.pick(body, ['title', 'message']));
  }

  delete(id: number) {
    return this.repository.softDelete(id);
  }

  bulkDelete(ids: number[]) {
    return this.repository.softDelete(ids);
  }
}
