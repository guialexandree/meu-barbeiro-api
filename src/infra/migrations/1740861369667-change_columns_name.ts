import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeColumnsName1740861369667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "alert" RENAME COLUMN "createdAt" TO "created_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "attendance" RENAME COLUMN "createdAt" TO "created_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "attendance" RENAME COLUMN "startDate" TO "start_date"`,
    )
    await queryRunner.query(
      `ALTER TABLE "attendance" RENAME COLUMN "cancellationDate" TO "cancellation_date"`,
    )
    await queryRunner.query(
      `ALTER TABLE "attendance" RENAME COLUMN "cancellationReason" TO "cancellation_reason"`,
    )
    await queryRunner.query(
      `ALTER TABLE "registration" RENAME COLUMN "createdAt" TO "created_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "registration" RENAME COLUMN "contactNumber" TO "contact_number"`,
    )
    await queryRunner.query(
      `ALTER TABLE "registration" RENAME COLUMN "smsStatus" TO "sms_status"`,
    )
    await queryRunner.query(
      `ALTER TABLE "service" RENAME COLUMN "createdAt" TO "created_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "service" RENAME COLUMN "updatedAt" TO "updated_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "service" RENAME COLUMN "timeExecution" TO "time_execution"`,
    )
    await queryRunner.query(
      `ALTER TABLE "sms" RENAME COLUMN "contactNumber" TO "contact_number"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "createdAt" TO "created_at"`,
    )
    await queryRunner.query(
        `ALTER TABLE "user" RENAME COLUMN "contactNumber" TO "contact_number"`,
      )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "alert" RENAME COLUMN "created_at" TO "createdAt"`,
    )
    await queryRunner.query(
      `ALTER TABLE "attendance" RENAME COLUMN "created_at" TO "createdAt"`,
    )
    await queryRunner.query(
      `ALTER TABLE "attendance" RENAME COLUMN "start_date" TO "startDate"`,
    )
    await queryRunner.query(
      `ALTER TABLE "attendance" RENAME COLUMN "cancellation_date" TO "cancellationDate"`,
    )
    await queryRunner.query(
      `ALTER TABLE "attendance" RENAME COLUMN "cancellation_reason" TO "cancellationReason"`,
    )
    await queryRunner.query(
      `ALTER TABLE "registration" RENAME COLUMN "created_at" TO "createdAt"`,
    )
    await queryRunner.query(
      `ALTER TABLE "registration" RENAME COLUMN "contact_number" TO "contactNumber"`,
    )
    await queryRunner.query(
      `ALTER TABLE "registration" RENAME COLUMN "sms_status" TO "smsStatus"`,
    )
    await queryRunner.query(
      `ALTER TABLE "service" RENAME COLUMN "created_at" TO "createdAt"`,
    )
    await queryRunner.query(
      `ALTER TABLE "service" RENAME COLUMN "updated_at" TO "updatedAt"`,
    )
    await queryRunner.query(
      `ALTER TABLE "service" RENAME COLUMN "time_execution" TO "timeExecution"`,
    )
    await queryRunner.query(
      `ALTER TABLE "sms" RENAME COLUMN "contact_number" TO "contactNumber"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "created_at" TO "createdAt"`,
    )
    await queryRunner.query(
        `ALTER TABLE "user" RENAME COLUMN "contact_number" TO "contactNumber"`,
      )
  }
}
