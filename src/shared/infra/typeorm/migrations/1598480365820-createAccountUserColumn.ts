import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class createAccountUserColumn1598480365820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("users", [
            new TableColumn({
                name: 'admin',
                type: 'boolean',
                default: false,
            }),
            new TableColumn({
                name: 'planLevel',
                type: "varchar",
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('users', [
            new TableColumn({
                name: 'admin',
                type: 'boolean'
            }),
            new TableColumn({
                name: 'planLevel',
                type: 'varchar'
            })
        ])
    }

}
