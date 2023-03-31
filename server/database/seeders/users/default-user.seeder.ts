import type { DataSource } from 'typeorm';
import type { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../entities/user/user.entity';

export class DefaultUserSeeder implements Seeder {
  public async run(_factory: Factory, connection: DataSource) {
    const userService = connection.getRepository(User);
    const currentUser = await userService.findOne({
      where: { email: 'admin@earlyalert.com' },
    });

    if (!currentUser) {
      await userService.save(
        userService.create({
          userId: 1,
          tenantId: 1,
          status: true,
          name: 'EA Admin',
          email: 'admin@earlyalert.com',
          roles: [{ id: 1 }],
        }),
      );
    }
  }
}

export default DefaultUserSeeder;
