import { MigrationInterface, QueryRunner } from "typeorm";

export class removedConstraint1548349936794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "bitcapitalDocumentId" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "bitcapitalDocumentId" SET NOT NULL`);
  }
}
