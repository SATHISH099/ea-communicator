import type { FindManyOptions, Repository } from 'typeorm';
import appDataSource from '../database/config/app.datasource';
import { Media } from '../database/entities/media/media.entity';
import type { QueryList } from '../validations/base';
import { BaseService } from './base.service';

export class MediaService extends BaseService<Media> {
  protected repository: Repository<Media>;

  constructor() {
    super();
    this.repository = appDataSource.getRepository(Media);
  }

  async findAll(query: QueryList, overrideOptions?: FindManyOptions<Media>) {
    const user = await getCurrentUser(this.event);

    return super.findAll(query, {
      ...overrideOptions,
      where: {
        tenantId: user.tenantId,
      },
    });
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
