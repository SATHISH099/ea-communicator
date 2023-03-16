import _ from 'lodash';
import type { FindOneOptions } from 'typeorm';
import appDataSource from '../database/config/app.datasource';
import { EmailGroup } from '../database/entities/emails/email-groups.entity';
import { EmailRecipient } from '../database/entities/emails/email-recipients.entity';
import { Email } from '../database/entities/emails/email.entity';
import type {
  EmailGroupDto,
  EmailRecipientDto,
} from '../dtos/emails/create-email.dto';
import type { UpdateEmailDto } from '../dtos/emails/update-email.dto';
import { RecipientType } from '../enums/recipient-type.enum';
import { SendingStatus } from '../enums/sending-status.enum';
import type { CreateEmailDto } from '../validations/emails/create.dto';
import { BaseService } from './base.service';
import { UserService } from './user.service';

export class EmailService extends BaseService<Email> {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
    this.repository = appDataSource.getRepository(Email);
  }

  findOne(id: number, overrideOptions?: FindOneOptions<Email>): Promise<Email> {
    return super.findOne(id, {
      ...overrideOptions,
      relations: { medias: true, recipients: true, groups: true },
    });
  }

  async createEmail(body: CreateEmailDto) {
    const user = await this.userService.getLoginUser();
    const sender = user;
    const { recipients, groups, ...emailObject } = body;
    const email = await super.create({
      ...emailObject,
      tenantId: user.tenantId,
      creator: user,
      sender,
      sendingStatus: SendingStatus.PENDING,
    });

    if (!body.isPredefined) {
      await this.recipientBind(recipients, email);
      await this.groupBind(groups, email);
    }

    return email;
  }

  async recipientBind(
    recipients: EmailRecipientDto,
    email: Email,
  ): Promise<void> {
    await Promise.all(
      recipients[RecipientType.TO].map((recipientId: number) => {
        const emailRecipientForTo = new EmailRecipient();
        emailRecipientForTo.emailId = email.id;
        emailRecipientForTo.recipientId = recipientId;
        emailRecipientForTo.recipientType = RecipientType.TO;

        return this.repository.manager.save(emailRecipientForTo);
      }),
    );

    await Promise.all(
      recipients[RecipientType.CC].map((recipientId: number) => {
        const emailRecipientForCc = new EmailRecipient();
        emailRecipientForCc.emailId = email.id;
        emailRecipientForCc.recipientId = recipientId;
        emailRecipientForCc.recipientType = RecipientType.CC;

        return this.repository.manager.save(emailRecipientForCc);
      }),
    );

    await Promise.all(
      recipients[RecipientType.BCC].map((recipientId: number) => {
        const emailRecipientForBcc = new EmailRecipient();
        emailRecipientForBcc.emailId = email.id;
        emailRecipientForBcc.recipientId = recipientId;
        emailRecipientForBcc.recipientType = RecipientType.BCC;

        return this.repository.manager.save(emailRecipientForBcc);
      }),
    );
  }

  async groupBind(groups: EmailGroupDto, email: Email): Promise<void> {
    await Promise.all(
      groups[RecipientType.TO].map((groupId: number) => {
        const emailGroupForTo = new EmailGroup();
        emailGroupForTo.emailId = email.id;
        emailGroupForTo.groupId = groupId;
        emailGroupForTo.groupType = RecipientType.TO;

        return this.repository.manager.save(emailGroupForTo);
      }),
    );

    await Promise.all(
      groups[RecipientType.CC].map((groupId: number) => {
        const emailGroupForCc = new EmailGroup();
        emailGroupForCc.emailId = email.id;
        emailGroupForCc.groupId = groupId;
        emailGroupForCc.groupType = RecipientType.CC;

        return this.repository.manager.save(emailGroupForCc);
      }),
    );

    await Promise.all(
      groups[RecipientType.BCC].map((groupId: number) => {
        const emailGroupForBcc = new EmailGroup();
        emailGroupForBcc.emailId = email.id;
        emailGroupForBcc.groupId = groupId;
        emailGroupForBcc.groupType = RecipientType.BCC;

        return this.repository.manager.save(emailGroupForBcc);
      }),
    );
  }

  async updateEmail(id: number, body: UpdateEmailDto) {
    const user = await this.userService.getLoginUser();
    const sender = (await this.userService.findOne(body.sender))!;
    const emailObject = _.omit(body, ['recipients', 'groups']);

    return super.update(id, {
      ...emailObject,
      tenantId: user.tenantId,
      creator: user,
      sender,
      sendingStatus: SendingStatus.PENDING,
    });
  }

  delete(id: number) {
    return this.repository.softDelete(id);
  }

  bulkDelete(ids: number[]) {
    return this.repository.softDelete(ids);
  }
}
