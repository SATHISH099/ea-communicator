import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table, TableForeignKey } from 'typeorm';

export class CreateEmailLibrariesTable1675977363612
  implements MigrationInterface
{
  private tableName = 'email_attachments';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'email_attachments',
        columns: [
          {
            name: 'email_id',
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
        columnNames: ['email_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'emails',
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
