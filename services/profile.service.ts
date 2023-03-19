import { z } from 'zod';
import type { ApiService } from './api.service';
import { ApiTarget } from './api.service';

const profile = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  email: z.string(),
  middle: z.string(),
  last: z.string(),
  address: z.string(),
  phone: z.string(),
  mobile: z.string(),
  designation: z.string(),
  notes: z.string(),
});

const userProfile = z.object({ data: profile, message: z.string() });

export type Profile = z.infer<typeof profile>;

interface Data {
  name: string;
  middle: string;
  last: string;
  address: string;
  phone: string;
  mobile: string;
  designation: string;
  notes: string;
}

export class ProfileService {
  constructor(private apiService: ApiService) {
    this.apiService.setTarget(ApiTarget.SMARTSUITE);
    this.apiService.setUrl('profile');
  }

  get() {
    return this.apiService.get(userProfile);
  }

  update(data: Data) {
    return this.apiService.put(userProfile, data, `/profile`);
  }
}
