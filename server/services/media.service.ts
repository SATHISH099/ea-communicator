import { Repository } from 'typeorm';
import { Media } from '../database/entities/media/media.entity';
import { BaseService } from './base.service';

export class MediaService extends BaseService<Media> {
  constructor(protected repository: Repository<Media>) {
    super();
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
