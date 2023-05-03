import typeOrmConfigs from './typeorm.config';

const options = {
  ...typeOrmConfigs(),
  seeds: [
    'server/database/seeders/roles/*.seeder.ts',
    'server/database/seeders/tenants/*.seeder.ts',
    'server/database/seeders/users/*.seeder.ts',
  ],
  factories: ['server/database/seeders/**/*.factory.ts'],
};

export default options;
