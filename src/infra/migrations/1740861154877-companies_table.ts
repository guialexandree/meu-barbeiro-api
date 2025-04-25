import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CompaniesTable1740861154877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'pix',
            type: 'varchar',
          },
          {
            name: 'status_attendance',
            type: 'enum',
            enum: ['serving', 'closed', 'in_pause'],
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies')
  }
}
