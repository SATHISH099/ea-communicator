import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table, TableForeignKey } from 'typeorm';

export class CreateSmsLogsTable1679681821697 implements MigrationInterface {
  protected tableName = 'sms_logs';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'increment',
          },
          {
            name: 'provider_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sms_id',
            type: 'int',
          },
          {
            name: 'recipient_id',
            type: 'int',
          },
          {
            name: 'phone_number',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['sms_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sms',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
