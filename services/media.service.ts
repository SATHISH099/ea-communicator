import { z } from 'zod';
import type { ApiService } from './api.service';

const media = z.object({
  id: z.number(),
  createdAt: z.number(),
  updatedAt: z.string(),
  title: z.string(),
  fileUrl: z.string(),
  mimeType: z.string(),
  size: z.string(),
  extension: z.string(),
  tenantId: z.null(),
});

const medias = z.array(media);

export type Media = z.infer<typeof media>;

export class MediaService {
  constructor(private apiService: ApiService) {
    this.apiService.setUrl('media');
  }

  getAll() {
    return this.apiService.get(medias);
  }
}
