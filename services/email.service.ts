import { z } from 'zod';
import type { ApiService } from './api.service';

const email = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  message: z.string(),
  sender: z.string(),
  isSms: z.boolean(),
  isVoice: z.boolean(),
  isEmail: z.boolean(),
  importanceLevel: z.string(),
  tenantId: z.string(),
});

const emails = z.object({ data: z.array(email), total: z.number() });

export type Email = z.infer<typeof email>;

export class EmailService {
  constructor(private apiService: ApiService) {
    this.apiService.setUrl('emails');
  }

  getAll() {
    return this.apiService.get(emails);
  }

  sendEmail(data: {}) {
    return this.apiService.post(emails, data);
  }
}
