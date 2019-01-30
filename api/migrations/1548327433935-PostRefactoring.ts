import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1548327433935 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" ADD "bitcapitalId" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "bitcapitalWalletId" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'active'`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bitcapitalWalletId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bitcapitalId"`);
  }
}
