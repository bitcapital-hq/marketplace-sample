import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1548199257239 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "document" character varying NOT NULL, "status" character varying NOT NULL, "telephoneCountryCode" character varying NOT NULL, "telephoneRegionalCode" character varying NOT NULL, "telephoneNumber" character varying NOT NULL, "residenceNumber" character varying NOT NULL, "residenceZipcode" character varying NOT NULL, "residenceInformation" character varying NOT NULL, "residenceReference" character varying NOT NULL, "accountAgencyNumber" character varying NOT NULL, "accountBankNumber" character varying NOT NULL, "accountNumber" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "storage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "price" integer NOT NULL, "deliveryFee" character varying NOT NULL, "quantity" character varying NOT NULL, "ownerId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_f9b67a9921474d86492aad2e027" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "extract" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "totalValue" integer NOT NULL, "quantity" integer NOT NULL, "customerId" uuid NOT NULL, "sellerId" uuid NOT NULL, "storageId" uuid NOT NULL, CONSTRAINT "PK_ec7cded7d354e84ca36012379cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "storage" ADD CONSTRAINT "FK_4aeb602026a5b626544c51eb407" FOREIGN KEY ("ownerId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "storage" ADD CONSTRAINT "FK_1f0ff4e5ad959c1050534857ea9" FOREIGN KEY ("productId") REFERENCES "product"("id")`);
        await queryRunner.query(`ALTER TABLE "extract" ADD CONSTRAINT "FK_0f7de9dc9f31b0e80ffcd56376c" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "extract" ADD CONSTRAINT "FK_8109186d3756a1be97d6e433d45" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "extract" ADD CONSTRAINT "FK_6c114b1877e109f0743b86c8d3f" FOREIGN KEY ("storageId") REFERENCES "storage"("id") ON DELETE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "extract" DROP CONSTRAINT "FK_6c114b1877e109f0743b86c8d3f"`);
        await queryRunner.query(`ALTER TABLE "extract" DROP CONSTRAINT "FK_8109186d3756a1be97d6e433d45"`);
        await queryRunner.query(`ALTER TABLE "extract" DROP CONSTRAINT "FK_0f7de9dc9f31b0e80ffcd56376c"`);
        await queryRunner.query(`ALTER TABLE "storage" DROP CONSTRAINT "FK_1f0ff4e5ad959c1050534857ea9"`);
        await queryRunner.query(`ALTER TABLE "storage" DROP CONSTRAINT "FK_4aeb602026a5b626544c51eb407"`);
        await queryRunner.query(`DROP TABLE "extract"`);
        await queryRunner.query(`DROP TABLE "storage"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
