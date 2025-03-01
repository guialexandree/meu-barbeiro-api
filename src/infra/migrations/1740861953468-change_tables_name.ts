import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeTablesName1740861953468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "alert" RENAME TO "alerts"`)
    await queryRunner.query(`ALTER TABLE "attendance" RENAME TO "attendances"`)
    await queryRunner.query(`ALTER TABLE "attendance_service" RENAME TO "attendances_services"`)
    await queryRunner.query(`ALTER TABLE "company" RENAME TO "companies"`)
    await queryRunner.query(`ALTER TABLE "registration" RENAME TO "registrations"`)
    await queryRunner.query(`ALTER TABLE "service" RENAME TO "services"`)
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "users"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "alerts" RENAME TO "alert"`)
    await queryRunner.query(`ALTER TABLE "attendances" RENAME TO "attendance"`)
    await queryRunner.query(`ALTER TABLE "attendances_servicese" RENAME TO "attendance_servic"`)
    await queryRunner.query(`ALTER TABLE "companies" RENAME TO "company"`)
    await queryRunner.query(`ALTER TABLE "registrations" RENAME TO "registration"`)
    await queryRunner.query(`ALTER TABLE "services" RENAME TO "service"`)
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "user"`)
  }
}
