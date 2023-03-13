import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { H3Event } from 'h3';
import { Query } from '@/server/types';

export interface BaseServiceInterface<EntityType> {
  findManyOptions(query: Query): FindManyOptions<EntityType>;

  findOneOptions(query?: Query): FindOneOptions<EntityType>;

  findAll(
    event?: H3Event,
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
