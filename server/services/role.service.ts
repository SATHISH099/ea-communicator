import appDataSource from '../database/config/app.datasource';
import { Role } from '../database/entities/role/role.entity';
import { BaseService } from './base.service';

export class RoleService extends BaseService<Role> {
  ROLE_NAMES = [
    {
      slug: 'admin',
      title: 'Admin',
    },
    {
      slug: 'event-manager',
      title: 'Event Manager',
    },
    {
      slug: 'supervisor',
      title: 'Supervisor',
    },
    {
      slug: 'team-member',
      title: 'Team Member',
    },
  ];

  constructor() {
    super();
    this.repository = appDataSource.getRepository(Role);
  }

  async createDefaultRoles(tenantId: number) {
    const existingRoles = await this.repository.find({
      where: {
        tenantId: tenantId.toString(),
      },
    });

    if (existingRoles.length > 0) {
      return existingRoles;
    }

    const roles = [];
    for await (const role of this.ROLE_NAMES) {
      roles.push(
        await this.repository.save(
          this.repository.create({
            name: role.title,
            slug: role.slug,
            tenantId: tenantId.toString(),
          }),
        ),
      );
    }

    return roles;
  }
}
