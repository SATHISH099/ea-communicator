import { DeepPartial } from 'typeorm';

import appDataSource from '../database/config/app.datasource';
import { BaseService } from './base.service';
import { User } from '../database/entities/user/user.entity';

export class UserService extends BaseService<User> {
  constructor() {
    super();
    this.repository = appDataSource.getRepository(User);
  }

  findOneUser(user_id: number) {
    return this.repository.findOne({
      where: { userId: user_id },
    });
  }

  create(data: DeepPartial<User>) {
    return super.create(data);
  }

  async getLoginUser() {
    return this.repository.createQueryBuilder().getOne();
  }
}
