import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table, TableForeignKey } from 'typeorm';

export class CreateMessagesTable1676470158069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'sender_email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sender_phone_no',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'message',
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
          },
          {
            name: 'is_sms',
            type: 'boolean',
          },
          {
            name: 'is_voice',
            type: 'boolean',
          },
          {
            name: 'is_email',
            type: 'boolean',
          },
          {
            name: 'creator_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'component_id',
            type: 'varchar',
            isNullable: true,
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
      'messages',
      new TableForeignKey({
        columnNames: ['creator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
