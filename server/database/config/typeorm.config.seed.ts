import typeOrmConfigs from './typeorm.config';

const options = {
  ...typeOrmConfigs(),
  seeds: ['server/database/seeders/*.seeder.ts'],
};

export default options;
