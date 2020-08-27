import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class diary1598544258777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "diary",
                columns: [
                 {
                     name: 'id',
                     type: 'uuid',
                     isPrimary: true,
                     generationStrategy: 'uuid',
                     default: 'uuid_generate_v4()'
                 },
                 {
                    name: 'gratitude1',
                    type: 'varchar',
                    isNullable: false,
                 },
                 {
                    name: 'gratitude2',
                    type: 'varchar',
                    isNullable: false,
                 },
                 {
                    name: 'gratitude3',
                    type: 'varchar',
                    isNullable: false,
                 },
                 {
                    name: 'activity1',
                    type: 'varchar',
                 },
                 {
                    name: 'activity2',
                    type: 'varchar',
                 },
                 {
                    name: 'activity3',
                    type: 'varchar',
                 },
                 {
                    name: 'diaryData',
                    type: 'timestamp',
                    isNullable: false
                 },
                 {
                    name: 'user_id',
                    type: 'uuid',
                },
                 {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                 },
                 {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                 }
                ],
                foreignKeys: [
                    {
                        name: "diaryId",
                        referencedTableName: 'users',
                        referencedColumnNames: ["id"],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("diary")
    }

}
