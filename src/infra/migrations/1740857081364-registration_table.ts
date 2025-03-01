import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class RegistrationTable1740857081364 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    await queryRunner.createTable(
      new Table({
        name: 'registration',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'contactNumber',
            type: 'varchar',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'smsStatus',
            type: 'enum',
            enum: ['pending', 'sending', 'error'],
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'activated'],
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION "uuid-ossp"`)
    await queryRunner.dropTable('registration')
  }
}
