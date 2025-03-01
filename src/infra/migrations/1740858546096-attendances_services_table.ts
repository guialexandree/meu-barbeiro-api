import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class AttendancesServicesTable1740858546096
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendance_service',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'attendance_id',
            type: 'uuid',
          },
          {
            name: 'service_id',
            type: 'uuid',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
        ],
      }),
      true,
    )

    await queryRunner.createForeignKeys('attendance_service', [
      new TableForeignKey({
        columnNames: ['attendance_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attendance',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['service_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'service',
        onDelete: 'CASCADE',
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('attendance_service')
  }
}
