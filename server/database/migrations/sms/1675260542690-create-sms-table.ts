import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSmsTable1675260542690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sms',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
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
      'sms',
      new TableForeignKey({
        columnNames: ['creator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sms');
  }
}
