import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMessageLibrariesTable1676470981416
  implements MigrationInterface
{
  private tableName = 'message_attachments';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'message_id',
            type: 'integer',
          },
          {
            name: 'media_id',
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
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['media_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attachments',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
