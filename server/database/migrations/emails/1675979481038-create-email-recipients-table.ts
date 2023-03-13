import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEmailRecipientsTable1675979481038
  implements MigrationInterface
{
  private tableName = 'email_recipients';

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
            name: 'email_id',
            type: 'integer',
          },
          {
            name: 'recipient_id',
            type: 'integer',
          },
          {
            name: 'recipient_type',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
