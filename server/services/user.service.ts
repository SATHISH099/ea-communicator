import _ from 'lodash';
import type { DeepPartial } from 'typeorm';

import appDataSource from '../database/config/app.datasource';
import { Role } from '../database/entities/role/role.entity';
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

  async updateUser(id: number, data: any) {
    const roles = await appDataSource.getRepository(Role).find({
      where: {
        id: data.role,
      },
    });

    const user = await this.repository.findOneByOrFail({
      userId: id,
    });

    user.roles = roles;

    await this.repository.manager.save(user);

    return this.repository.update(
      {
        userId: id,
      },
      _.pick(data, ['name', 'email', 'status', 'department', 'team', 'notes']),
    );
  }

  async getLoginUser() {
    return (await this.repository.createQueryBuilder().getOne())!;
  }
}
