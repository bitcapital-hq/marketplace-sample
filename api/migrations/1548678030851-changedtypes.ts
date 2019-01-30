import {MigrationInterface, QueryRunner} from "typeorm";

export class changedtypes1548678030851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "deliveryFee"`);
        await queryRunner.query(`ALTER TABLE "storage" ADD "deliveryFee" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "storage" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "storage" ADD "quantity" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "deliveryFee"`);
        await queryRunner.query(`ALTER TABLE "storage" ADD "deliveryFee" character varying NOT NULL`);
    }

}
