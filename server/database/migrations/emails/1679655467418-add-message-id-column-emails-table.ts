import type { MigrationInterface, QueryRunner } from 'typeorm';

export class addMessageIdColumnEmailsTable1679655467418
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE emails ADD message_id varchar(255) NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE emails DROP COLUMN message_id');
  }
}
