import type { DataSource } from 'typeorm';
import type { Factory, Seeder } from 'typeorm-seeding';
import { Role } from '../entities/role/role.entity';
import { User } from '../entities/user/user.entity';

export class DefaultUserSeeder implements Seeder {
  public async run(factory: Factory, connection: DataSource) {
    const userRepository = connection.getRepository(User);
    const roleRepository = connection.getRepository(Role);

    const userId = 1;
    let user = await userRepository.findOne({
      where: { userId },
    });

    const roles = (await roleRepository.findOneBy({ slug: 'admin' }))!;
    const userData = await factory(User)().make();

    if (user) {
      user = userRepository.create({
        ...Object.assign(user, userData),
        roles: [roles],
      });
    } else {
      user = userRepository.create({ ...userData, roles: [roles] });
    }

    await userRepository.save(user);
  }
}
export default DefaultUserSeeder;
