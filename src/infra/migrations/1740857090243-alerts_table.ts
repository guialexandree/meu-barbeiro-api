import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class AlertsTable1740857090243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    await queryRunner.createTable(
      new Table({
        name: 'alerts',
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
            name: 'type',
            type: 'enum',
            enum: ['home', 'services', 'history'],
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['ativo', 'inativo'],
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('alert')
  }
}
