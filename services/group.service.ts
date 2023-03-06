import { z } from 'zod';
import type { ApiService } from './api.service';

const group = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  groupName: z.string(),
  alternateEmail: z.string(),
  status: z.boolean(),
  notes: z.string(),
  location: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  deviceId: z.string(),
});

const groups = z.object({ data: z.array(group), total: z.number() });

export type Group = z.infer<typeof group>;

export class GroupService {
  constructor(private apiService: ApiService) {
    this.apiService.setMode('smartSuite');
    this.apiService.setUrl('groups');
  }

  getAll() {
    return this.apiService.get(groups);
  }

  createGroup(data: {}) {
    return this.apiService.post(groups, data);
  }
}
