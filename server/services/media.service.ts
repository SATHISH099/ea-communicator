import type { Repository } from 'typeorm';
import appDataSource from '../database/config/app.datasource';
import { Media } from '../database/entities/media/media.entity';
import { BaseService } from './base.service';

export class MediaService extends BaseService<Media> {
  protected repository: Repository<Media>;

  constructor() {
    super();
    this.repository = appDataSource.getRepository(Media);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
