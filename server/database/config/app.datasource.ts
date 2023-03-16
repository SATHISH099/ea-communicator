import 'reflect-metadata';

import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import typeOrmConfig from './typeorm.config';

dotenv.config();
const appDataSource = new DataSource(typeOrmConfig());
appDataSource
  .initialize()
  .then(() => {
    console.log('Database Initialized');
  })
  .catch((e) => {
    console.log('Error during Data Source initialization', e);
  });

export default appDataSource;
