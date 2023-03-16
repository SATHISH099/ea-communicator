import { faker } from '@faker-js/faker';
import { Role } from '../../entities/role/role.entity';

export const roleData = () => {
  const role = new Role();
  role.tenantId = faker.random.alphaNumeric();
  role.name = faker.random.words();
  role.slug = role.name
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return role;
};
