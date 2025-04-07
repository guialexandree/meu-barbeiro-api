import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixStatusUsers1743986993255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE users 
                ALTER COLUMN status 
                TYPE VARCHAR(255) 
                USING status::VARCHAR(255);
            `)

    await queryRunner.query(`
                CREATE TYPE new_user_status_enum AS ENUM('actived', 'deactivated', 'canceled');
            `)

    await queryRunner.query(`
            UPDATE users SET status = 'deactivated' WHERE status = 'bloqued';
            UPDATE users SET status = 'actived' WHERE status = 'actived';
            UPDATE users SET status = 'canceled' WHERE status = 'canceled';
        `)

    await queryRunner.query(`
                ALTER TABLE users 
                ALTER COLUMN status 
                TYPE new_user_status_enum 
                USING status::new_user_status_enum;
            `)

    await queryRunner.query(`
                DROP TYPE IF EXISTS user_status_enum;
            `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TYPE user_status_enum AS ENUM('actived', 'bloqued', 'canceled');
            `)

    await queryRunner.query(`
            UPDATE users SET status = 'bloqued' WHERE status = 'deactivated';
            UPDATE users SET status = 'actived' WHERE status = 'actived';
            UPDATE users SET status = 'canceled' WHERE status = 'canceled';
        `)

    await queryRunner.query(`
                ALTER TABLE users 
                ALTER COLUMN status 
                TYPE user_status_enum 
                USING status::user_status_enum;
            `)

    await queryRunner.query(`
                DROP TYPE IF EXISTS new_user_status_enum;
            `)
  }
}
