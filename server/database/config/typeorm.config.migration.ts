import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import typeOrmConfig from './typeorm.config';
dotenv.config();

const options = {
  ...typeOrmConfig(),
  migrations: ['server/database/migrations/**/*.ts'],
};

export default new DataSource(options);
