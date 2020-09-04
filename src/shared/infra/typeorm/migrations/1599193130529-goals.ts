import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class goals1599193130529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "goals",
                columns: [
                 {
                     name: 'id',
                     type: 'uuid',
                     isPrimary: true,
                     generationStrategy: 'uuid',
                     default: 'uuid_generate_v4()'
                 },
                 {
                    name: 'user_id',
                    type: 'uuid',
                },
                 {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false,
                 },
                 {
                    name: 'status',
                    type: 'varchar',
                    isNullable: false,
                 },
                 {
                    name: 'group',
                    type: 'varchar',
                    isNullable: false,
                 },
                 {
                    name: 'startDate',
                    type: 'timestamp with time zone',
                    isNullable: false
                 },
                 {
                    name: 'deadDate',
                    type: 'timestamp with time zone',
                    isNullable: false
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
                        name: "goalId",
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
        await queryRunner.dropTable("goals")
    }

}
