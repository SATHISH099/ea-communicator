import { EmailGroup } from './entities/emails/email-groups.entity';
import { EmailRecipient } from './entities/emails/email-recipients.entity';
import { Email } from './entities/emails/email.entity';
import { Media } from './entities/media/media.entity';
import { MessageGroup } from './entities/message/message-groups.entity';
import { MessageRecipient } from './entities/message/message-recipients.entity';
import { Message } from './entities/message/message.entity';
import { Permission } from './entities/permission/permission.entity';
import { Role } from './entities/role/role.entity';
import { SmsGroup } from './entities/sms/sms-groups.entity';
import { SmsRecipient } from './entities/sms/sms-recipients.entity';
import { Sms } from './entities/sms/sms.entity';
import { User } from './entities/user/user.entity';
import { Voice } from './entities/voice/voice.entity';

export const entities = [
  User,
  Email,
  Sms,
  Voice,
  Message,
  Media,
  Role,
  Permission,
  EmailGroup,
  EmailRecipient,
  MessageGroup,
  MessageRecipient,
  SmsGroup,
  SmsRecipient,
];
