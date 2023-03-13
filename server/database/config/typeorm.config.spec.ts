import { DataSource } from 'typeorm';
import { describe, expect, it } from 'vitest';
import seedConfig from './typeorm.config.seed';
import migrationConfig from './typeorm.config.migration';

describe('TyperOrmConfig', () => {
  it('seed', () => {
    expect(seedConfig).toHaveProperty('type');
  });

  it('migration', () => {
    expect(migrationConfig).toBeInstanceOf(DataSource);
  });
});
