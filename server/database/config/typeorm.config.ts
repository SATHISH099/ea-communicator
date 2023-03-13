import { DataSourceOptions } from 'typeorm';
import { entities } from '../entities';

export const typeormConfigs = () => {
  let options: DataSourceOptions;

  if (process.env.DB_TYPE === 'postgres') {
    options = {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'communicator',
    };
  } else if (process.env.DB_TYPE === 'mysql') {
    options = {
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'smartsuite',
    };
  } else {
    options = {
      type: 'sqlite',
      database: 'database.db',
    };
  }

  options = { ...options, entities, synchronize: false, logging: true };
  return options;
};

export default typeormConfigs;
