import type {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import _ from 'lodash';
import type { BaseEntity } from '../database/base.entity';
import type { QueryList } from '../validations/base';
import type { BaseServiceInterface } from './base.service.interface';

export class BaseService<EntityType extends BaseEntity>
  implements BaseServiceInterface<EntityType>
{
  protected repository: Repository<EntityType>;

  findManyOptions(query: QueryList) {
    const options = {
      order: {
        [query.orderBy]: query.orderType,
      },
    } as FindManyOptions<EntityType>;
    options.relations = {};
    const pageSize = query.pageSize;
    if (pageSize !== -1) {
      let pageNumber = query.pageNumber;
      pageNumber = pageNumber > 0 ? pageNumber : 1;
      const offset = pageSize * (pageNumber - 1);
      options.take = pageSize;
      options.skip = offset;
    }

    return options;
  }

  findOneOptions() {
    const options: FindOneOptions<EntityType> = {};

    return options;
  }

  async findAll(
    query: QueryList,
    overrideOptions?: FindManyOptions<EntityType>,
  ) {
    let options = this.findManyOptions(query);
    if (overrideOptions) {
      options = _.merge(options, overrideOptions);
    }
    const [data, total] = await this.repository.findAndCount(options);
    return { data, total };
  }

  async create(data: DeepPartial<EntityType>) {
    const item = await this.repository.save(this.repository.create(data));
    return this.findOne(item.id);
  }

  findOne(id?: number, overrideOptions?: FindOneOptions<EntityType>) {
    let options = {
      ...this.findOneOptions(),
      where: { id },
    } as FindOneOptions<EntityType>;

    if (overrideOptions) {
      options = _.merge(options, overrideOptions);
    }

    return this.repository.findOneOrFail(options);
  }

  async update(
    id: number,
    data: DeepPartial<EntityType>,
    overrideOptions?: FindOneOptions<EntityType>,
  ) {
    const item = await this.findOne(id, overrideOptions);
    // Note: Don't use spread operator to merge objects.
    await this.repository.save(Object.assign(item, data));
    return this.findOne(id);
  }

  async remove(id: number, overrideOptions?: FindOneOptions<EntityType>) {
    const item = await this.findOne(id, overrideOptions);
    await this.repository.remove(item);
    return item;
  }

  async firstOrCreate(
    data: DeepPartial<EntityType>,
    fields?: (keyof EntityType)[],
  ) {
    if (!fields) {
      fields = Object.keys(data) as (keyof EntityType)[];
    }
    const findBy = _.pick(data, fields);
    let item = await this.repository.findOneBy(findBy as object);
    if (item) {
      // Note: Don't use spread operator to merge objects.
      data = Object.assign(item, data);
    }
    item = await this.repository.save(data);
    return item;
  }

  getRespository() {
    return this.repository;
  }
}
