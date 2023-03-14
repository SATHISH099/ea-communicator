import { Factory, Seeder } from 'typeorm-seeding';
import { Role } from '../entities/role.entity';
export class RoleSeeder implements Seeder {
  public async run(factory: Factory) {
    await factory(Role)().makeMany(10);
  }
}
export default RoleSeeder;
