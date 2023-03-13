import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { UserService } from '../user/user.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    protected permissionRepo: Repository<Permission>,
    private userService: UserService,
    private roleService: RolesService,
  ) {}

  addOptionsInMany(options: FindManyOptions<Permission>) {
    if (!options.where) {
      options.where = {};
    }
  }

  create(createPermissionDto: CreatePermissionDto) {
    const { name } = createPermissionDto;

    return this.permissionRepo.save({
      ...createPermissionDto,
      slug: name.split(' ').join('.'),
    });
  }

  findAll() {
    return this.permissionRepo.find();
  }

  findOne(id: number) {
    return this.permissionRepo.findOneBy({ id: id });
  }

  async customUserpermission(userId: string, id: string) {
    const permissionData = await this.permissionRepo.findOneBy({ id: +id });

    const userData = await this.userService.findOne(+userId);
    return this.permissionRepo.save(
      this.permissionRepo.create({
        ...Object.assign(permissionData),
        userRole: userData,
      }),
    );
  }

  async customRolepermission(roleId: Array<string>, id: string) {
    const permissionData = await this.permissionRepo.findOneBy({ id: +id });
    const roleBind = [];
    for (const key in roleId) {
      const roleData = await this.roleService.findOne(+roleId[key]);
      roleBind.push(roleData);
    }

    return this.permissionRepo.save(
      this.permissionRepo.create({
        ...Object.assign(permissionData),
        roles: roleBind,
      }),
    );
  }

  updatePermission(id: number, updatePermissionDto: UpdatePermissionDto) {
    const { name } = updatePermissionDto;
    return this.permissionRepo.update(id, {
      ...updatePermissionDto,
      slug: name.split(' ').join('.'),
    });
  }

  async remove(id: number) {
    const permission: Permission = await this.findOne(id);
    return this.permissionRepo.remove(permission);
  }
}
