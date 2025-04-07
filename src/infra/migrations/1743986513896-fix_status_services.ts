import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixStatusServices1743986513896 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE services 
            ALTER COLUMN status 
            TYPE VARCHAR(255) 
            USING status::VARCHAR(255);
        `)

    await queryRunner.query(`
            CREATE TYPE new_service_status_enum AS ENUM('actived', 'deactivated', 'canceled');
        `)

    await queryRunner.query(`
            UPDATE services SET status = 'deactivated' WHERE status = 'inativo';
            UPDATE services SET status = 'actived' WHERE status = 'ativo';
            UPDATE services SET status = 'canceled' WHERE status = 'inativo';
        `)

    await queryRunner.query(`
            ALTER TABLE services 
            ALTER COLUMN status 
            TYPE new_service_status_enum 
            USING status::new_service_status_enum;
        `)

    await queryRunner.query(`
            DROP TYPE IF EXISTS service_status_enum;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE service_status_enum AS ENUM('actived', 'bloqued', 'canceled');
        `)

    await queryRunner.query(`
            UPDATE services SET status = 'inativo' WHERE status = 'deactivated';
            UPDATE services SET status = 'ativo' WHERE status = 'actived';
            UPDATE services SET status = 'inativo' WHERE status = 'canceled';
        `)

    await queryRunner.query(`
            ALTER TABLE services 
            ALTER COLUMN status 
            TYPE service_status_enum 
            USING status::service_status_enum;
        `)

    await queryRunner.query(`
            DROP TYPE IF EXISTS new_service_status_enum;
        `)
  }
}
