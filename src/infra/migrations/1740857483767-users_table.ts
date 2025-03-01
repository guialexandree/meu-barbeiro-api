import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class UsersTable1740857483767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['actived', 'bloqued', 'canceled'],
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'contactNumber',
            type: 'varchar',
          },
          {
            name: 'deviceId',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['admin', 'barber', 'client'],
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'registration_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    )

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['registration_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'registration',
        onDelete: 'SET NULL',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user')
  }
}
