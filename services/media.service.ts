import { z } from 'zod';
import type { ApiService } from './api.service';

const media = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  fileUrl: z.string(),
  mimeType: z.string(),
  size: z.string(),
  extension: z.string(),
  tenantId: z.null(),
});

const medias = z.object({ data: z.array(media), total: z.number() });

export type Media = z.infer<typeof media>;
export class MediaService {
  constructor(private apiService: ApiService) {
    this.apiService.setUrl('medias');
  }

  getAll() {
    return this.apiService.get(medias);
  }

  create(formData: FormData) {
    return this.apiService.post(media, formData);
  }

  delete(id: number) {
    return this.apiService.delete(media, `/medias/${id}`);
  }
}
