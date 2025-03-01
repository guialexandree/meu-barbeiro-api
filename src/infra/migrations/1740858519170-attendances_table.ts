import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class AttendancesTable1740858519170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendance',
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
            name: 'startDate',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'cancellationDate',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'cancellationReason',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['nafila', 'ematendimento', 'cancelado'],
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    )

    await queryRunner.createForeignKey(
      'attendance',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'SET NULL',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('attendance')
  }
}
