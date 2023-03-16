import type { DataSource, QueryFailedError } from 'typeorm';
import type { Factory, Seeder } from 'typeorm-seeding';
import { Role } from '../../entities/role/role.entity';
import { Roles } from '~~/server/enums/role.enum';

export class DefaultRoleSeeder implements Seeder {
  public async run(_factory: Factory, connection: DataSource) {
    const roleRepository = connection.getRepository(Role);
    for (const roleKey in Roles) {
      const enumKey = roleKey as keyof typeof Roles;
      const tenantId = '1';
      const name = roleKey;
      const slug = Roles[enumKey];
      const existingRole = await roleRepository.findOneBy({ name });

      let role: Role;
      const roleData = {
        tenantId,
        name,
        slug,
      };

      if (existingRole) {
        role = roleRepository.create({
          ...Object.assign(existingRole, roleData),
        });
      } else {
        role = roleRepository.create(roleData);
      }

      await roleRepository.save(role).catch((error: QueryFailedError) => {
        console.log(error.message);
      });
    }
  }
}

export default DefaultRoleSeeder;
