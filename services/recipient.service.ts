import { z } from 'zod';
import type { ApiService } from './api.service';
import { ApiTarget } from './api.service';

const recipient = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  nickName: z.string(),
  cellVoice: z.string(),
  cellText: z.string(),
  homeNumber: z.string(),
  workNumber: z.string(),
  emailAddress: z.string(),
  alternateEmail: z.string(),
  status: z.boolean(),
  notes: z.string(),
  location: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  deviceId: z.string(),
  groups: z.array(z.unknown()),
});

const recipients = z.object({ data: z.array(recipient), total: z.number() });

export type Recipient = z.infer<typeof recipient>;

interface Data {
  firstName: string;
  lastName: string;
  middleName: string;
  nickName: string;
  cellVoice: string;
  cellText: string;
  homeNumber: string;
  workNumber: string;
  emailAddress: string;
  alternateEmail: string;
  status: boolean;
  location: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class RecipientService {
  constructor(private apiService: ApiService) {
    this.apiService.setTarget(ApiTarget.SMARTSUITE);
    this.apiService.setUrl('recipients');
  }

  getAll() {
    return this.apiService.get(recipients);
  }

  create(data: Data) {
    return this.apiService.post(recipients, data);
  }

  update(id: number, data: Data) {
    return this.apiService.put(recipient, data, `/recipients/${id}`);
  }

  delete(id: number) {
    return this.apiService.delete(recipient, `/recipients/${id}`);
  }
}
