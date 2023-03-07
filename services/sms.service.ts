import { z } from 'zod';
import type { ApiService } from './api.service';

const sms = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  message: z.string(),
  sender: z.string(),
  sendingStatus: z.string(),
  importanceLevel: z.string(),
  tenantId: z.string(),
});

const smsMessages = z.object({ data: z.array(sms), total: z.number() });

export type Sms = z.infer<typeof sms>;

export class SmsService {
  constructor(private apiService: ApiService) {
    this.apiService.setUrl('sms');
  }

  getAll() {
    return this.apiService.get(smsMessages);
  }

  delete(id: number) {
    return this.apiService.delete(smsMessages, `sms/${id}`);
  }

  sendSms(data: {}) {
    return this.apiService.post(smsMessages, data);
  }
}
