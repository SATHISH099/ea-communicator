import type { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../entities/user/user.entity';

export class UserSeeder implements Seeder {
  public async run(factory: Factory) {
    await factory(User)().makeMany(10);
  }
}

export default UserSeeder;
