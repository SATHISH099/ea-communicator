import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMessageGroupsTable1676470828105
  implements MigrationInterface
{
  private tableName = 'message_groups';

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
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'message_id',
            type: 'integer',
          },
          {
            name: 'group_id',
            type: 'integer',
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['message_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'messages',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
