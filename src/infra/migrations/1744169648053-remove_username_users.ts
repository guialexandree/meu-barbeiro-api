import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class RemoveUsernameUser1744169648053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('users', 'username')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn('users', {
      ...null as unknown as TableColumn,
      name: 'username',
      type: 'varchar',
      clone: function (): TableColumn {
        throw new Error('Function not implemented.')
      }
    },)
  }
}
