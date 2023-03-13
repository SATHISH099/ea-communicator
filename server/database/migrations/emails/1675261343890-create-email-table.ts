import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table, TableForeignKey } from 'typeorm';

export class CreateEmailTable1675261343890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'emails',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'body',
            type: 'text',
          },
          {
            name: 'sender',
            type: 'varchar',
          },
          {
            name: 'sending_status',
            type: 'varchar',
          },
          {
            name: 'importance_level',
            type: 'varchar',
          },
          {
            name: 'is_predefined',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'creator_id',
            type: 'integer',
          },
          {
            name: 'tenant_id',
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
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'emails',
      new TableForeignKey({
        columnNames: ['creator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('emails');
  }
}
