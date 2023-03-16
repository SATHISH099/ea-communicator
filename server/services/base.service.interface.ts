import type { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import type { QueryList } from '../validations/base';

export interface BaseServiceInterface<EntityType> {
  findManyOptions(query: QueryList): FindManyOptions<EntityType>;

  findOneOptions(query?: QueryList): FindOneOptions<EntityType>;

  findAll(
    query?: QueryList,
    overrideOptions?: FindManyOptions<EntityType>,
  ): Promise<{ data: EntityType[]; total: number }>;

  create(data: DeepPartial<EntityType>): Promise<EntityType>;

  findOne(
    id: number,
    overrideOptions?: FindOneOptions<EntityType>,
  ): Promise<EntityType>;

  update(
    id: number,
    data: DeepPartial<EntityType>,
    overrideOptions: FindOneOptions<EntityType>,
  ): Promise<EntityType>;

  remove(
    id: number,
    overrideOptions: FindOneOptions<EntityType>,
  ): Promise<EntityType>;
}
