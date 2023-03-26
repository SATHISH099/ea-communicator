import appDataSource from '../database/config/app.datasource';
import { Role } from '../database/entities/role/role.entity';
import { BaseService } from './base.service';

export class RoleService extends BaseService<Role> {
  constructor() {
    super();
    this.repository = appDataSource.getRepository(Role);
  }
}
