import { faker } from '@faker-js/faker';
import { Permission } from '../../entities/permission/permission.entity';
import { User } from '../../entities/user/user.entity';

export const userData = () => {
  const user = new User();
  user.userId = 1;
  user.status = true;
  user.tenantId = 1;
  user.department = faker.random.words();
  user.team = faker.random.words();
  user.notes = faker.random.words();
  return user;
};

export const permissionData = () => {
  const permission = new Permission();
  permission.name = faker.random.words();
  permission.description = faker.random.words();
  return permission;
};
