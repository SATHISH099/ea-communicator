import { z } from 'zod';
import type { ApiService } from './api.service';
import { ApiTarget } from './api.service';

const profile = z.object({
  id: z.number(),
  createdAt: z.string(),
  firstName: z.string(),
  email: z.string(),
  middleName: z.string().nullable(),
  lastName: z.string().nullable(),
  address: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  designation: z.string().nullable(),
  notes: z.string().nullable(),
});

export type Profile = z.infer<typeof profile>;

interface Data {
  firstName: string;
  middleName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  designation?: string;
  notes?: string;
}

export class ProfileService {
  constructor(private apiService: ApiService) {
    this.apiService.setTarget(ApiTarget.SMARTSUITE);
    this.apiService.setUrl('profile');
  }

  setAuth() {
    this.apiService.setOptions({
      headers: {
        Authorization: `bearer ${localStorage.getItem('ss_token')}`,
      },
    });
  }

  get() {
    return this.apiService.get(profile);
  }

  update(data: any) {
    return this.apiService.putForm(profile, data, `/profile`);
  }
}
