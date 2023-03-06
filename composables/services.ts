import { ApiService } from '~~/services/api.service';
import { MediaService } from '~~/services/media.service';
import { EmailService } from '~~/services/email.service';
import { SmsService } from '~~/services/sms.service';
import { MessageService } from '~~/services/message.service';
import { GroupService } from '~~/services/group.service';
import { RecipientService } from '~~/services/recipient.service';

const api = new ApiService();
const media = new MediaService(new ApiService());
const email = new EmailService(new ApiService());
const sms = new SmsService(new ApiService());
const message = new MessageService(new ApiService());
const group = new GroupService(new ApiService());
const recipient = new RecipientService(new ApiService());

const services = {
  api,
  media,
  email,
  sms,
  message,
  group,
  recipient,
};

type Services = typeof services;
type ServiceKey = keyof Services;

export function useService<T extends ServiceKey>(key: T): Services[T] {
  return services[key];
}
