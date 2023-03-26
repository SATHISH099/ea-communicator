import { z } from 'zod';
import type { ApiService } from './api.service';
import { ApiTarget } from './api.service';

const group = z.object({
  groupName: z.string(),
  recipientCount: z.number(),
  status: z.boolean(),
  notes: z.string(),
  location: z.string(),
  deviceId: z.string(),
  recipients: z.array(z.unknown()),
});

const noSchema = z.object({});

const groups = z.object({ data: z.array(group), total: z.number() });

export type Group = z.infer<typeof group>;

interface Data {
  groupName: string;
  status: boolean;
  notes: string;
  location: {
    id: number;
  };
}

export class GroupService {
  constructor(private apiService: ApiService) {
    this.apiService.setTarget(ApiTarget.SMARTSUITE);
    this.apiService.setUrl('groups');
  }

  setAuth() {
    this.apiService.setOptions({
      headers: {
        Authorization: `bearer ${localStorage.getItem('ss_token')}`,
      },
    });
  }

  getAll() {
    return this.apiService.get(groups);
  }

  update(id: number, data: Data) {
    return this.apiService.put(group, data, `/groups/${id}`);
  }

  fetch(data: Data) {
    return this.apiService.post(noSchema, data, `/groups/fetch`);
  }

  delete(id: number) {
    return this.apiService.delete(groups, `groups/${id}`);
  }

  createGroup(data: {}) {
    return this.apiService.post(group, data);
  }
}
