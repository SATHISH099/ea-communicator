import { Repository } from 'typeorm';
import appDataSource from '../database/config/app.datasource';
import { Role } from '../database/entities/role/role.entity';
import { UserService } from './user.service';

export class RolesService {
  constructor(private userService: UserService) {}

  async create(createRoleDto: CreateRoleDto) {
    const role: Role = this.roleRepository.create();
    const { name } = createRoleDto;

    await this.roleRepository.save({
      ...createRoleDto,
      slug: name.split(' ').join('-'),
    });
    return role;
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOneBy({ id: id });
  }

  findBySlug(slug: string) {
    if (slug !== undefined || slug !== null) {
      return this.roleRepository.findOneByOrFail({ slug });
    }
    return null;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    const { name } = updateRoleDto;
    return this.roleRepository.update(id, {
      ...updateRoleDto,
      slug: name.split(' ').join('-'),
    });
  }

  async remove(id: number) {
    const role: Role = await this.findOne(id);
    return this.roleRepository.remove(role);
  }
}
