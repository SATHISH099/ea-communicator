import type { DataSource, QueryFailedError } from 'typeorm';
import type { Factory, Seeder } from 'typeorm-seeding';
import { Role } from '../../entities/role/role.entity';
import { Roles } from '~~/server/enums/role.enum';

export class DefaultRoleSeeder implements Seeder {
  public async run(factory: Factory, connection: DataSource) {
    const roleRepository = connection.getRepository(Role);
    for (const roleKey in Roles) {
      const role: any = roleKey;
      const tenantId = '1';
      const name = role;
      const slug = Roles[roleKey];
      let rolerepo = await roleRepository.findOneBy({ name });
      const roleData = await factory(Role)().make({
        tenantId,
        name,
        slug,
      });
      if (rolerepo) {
        rolerepo = roleRepository.create({
          ...Object.assign(rolerepo, roleData),
        });
      } else {
        rolerepo = roleRepository.create(roleData);
      }

      await roleRepository.save(rolerepo).catch((error: QueryFailedError) => {
        console.log(error.message);
      });
    }
  }
}

export default DefaultRoleSeeder;
