import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class SmsTable1740857191027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sms',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'contactNumber',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'response',
            type: 'varchar',
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sms')
  }
}
