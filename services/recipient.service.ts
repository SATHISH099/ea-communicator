import { z } from 'zod';
import type { ApiService } from './api.service';
import { ApiTarget } from './api.service';

const recipient = z.object({
  id: z.number(),
  name: z.string(),
  cellVoice: z.string(),
  cellText: z.string(),
  homeNumber: z.string(),
  workNumber: z.string(),
  emailAddress: z.string(),
  alternateEmail: z.string().optional(),
  status: z.boolean(),
  notes: z.string().optional(),
  groups: z.array(z.unknown()).optional(),
});

const noSchema = z.object({});

const recipients = z.object({ data: z.array(recipient), total: z.number() });

export type Recipient = z.infer<typeof recipient>;

interface Data {
  name: string;
  cellVoice: string;
  cellText: string;
  homeNumber: string;
  workNumber: string;
  emailAddress: string;
  alternateEmail: string;
  status: boolean;
  location: {
    id: number;
  };
}

export class RecipientService {
  constructor(private apiService: ApiService) {
    this.apiService.setTarget(ApiTarget.SMARTSUITE);
    this.apiService.setUrl('recipients');
  }

  setAuth() {
    this.apiService.setOptions({
      headers: {
        Authorization: `bearer ${localStorage.getItem('ss_token')}`,
      },
    });
  }

  getAll(params: Record<string, any>) {
    return this.apiService.get(recipients, undefined, {
      params,
    });
  }

  count() {
    return this.apiService.get(z.number(), '/recipients/count');
  }

  create(data: Data) {
    return this.apiService.post(recipient, data);
  }

  fetch(data: Data) {
    return this.apiService.post(noSchema, data, `/recipients/fetch`);
  }

  update(id: number, data: Data) {
    return this.apiService.put(recipient, data, `/recipients/${id}`);
  }

  delete(id: number) {
    return this.apiService.delete(recipient, `/recipients/${id}`);
  }

  bulkCreate(formData: FormData) {
    return this.apiService.post(recipient, formData, `/recipients/bulk`);
  }
}
