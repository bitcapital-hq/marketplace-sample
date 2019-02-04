import { MigrationInterface, QueryRunner } from "typeorm";

export class addedbitcapitaldocumentid1548344594726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" ADD "bitcapitalDocumentId" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bitcapitalDocumentId"`);
  }
}
