import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1723128239262 implements MigrationInterface {
    name = ' $npmConfigName1723128239262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store\` ADD \`district\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`district\``);
    }

}
