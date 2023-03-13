import type { DeepPartial } from 'typeorm';

import appDataSource from '../database/config/app.datasource';
import { User } from '../database/entities/user/user.entity';
import { BaseService } from './base.service';

export class UserService extends BaseService<User> {
  constructor() {
    super();
    this.repository = appDataSource.getRepository(User);
  }

  findOneUser(userId: number) {
    return this.repository.findOne({
      where: { id: userId },
    });
  }

  create(data: DeepPartial<User>) {
    return super.create(data);
  }

  async getLoginUser() {
    return (await this.repository.createQueryBuilder().getOne())!;
  }
}
