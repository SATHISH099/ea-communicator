import typeOrmConfigs from './typeorm.config';

const options = {
  ...typeOrmConfigs(),
  seeds: ['server/**/**/seeders/*.seeder.ts'],
};

export default options;
