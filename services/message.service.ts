import { z } from 'zod';
import type { ApiService } from './api.service';

const message = z.object({
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

const messages = z.object({ data: z.array(message), total: z.number() });

export type Message = z.infer<typeof message>;

export class MessageService {
  constructor(private apiService: ApiService) {
    this.apiService.setUrl('messages');
  }

  getAll() {
    return this.apiService.get(messages);
  }

  delete(id: number) {
    return this.apiService.delete(messages, `messages/${id}`);
  }

  sendMessage(data: {}) {
    return this.apiService.post(message, data);
  }
}
