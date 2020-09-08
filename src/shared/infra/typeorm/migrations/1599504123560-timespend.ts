import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class timespend1599504123560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "timespend",
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
                    name: 'workTime',
                    type: 'decimal', precision: 4, scale: 2,
                    isNullable: true,
                 },
                 {
                    name: 'sleepTime',
                    type: 'decimal', precision: 4, scale: 2,
                    isNullable: true,
                 },
                 {
                    name: 'studyTime',
                    type: 'decimal', precision: 4, scale: 2,
                    isNullable: true,
                 },
                 {
                    name: 'trainingTime',
                    type: 'decimal', precision: 4, scale: 2,
                    isNullable: true,
                 },
                 {
                    name: 'leisureTime',
                    type: 'decimal', precision: 4, scale: 2,
                    isNullable: true,
                 },
                 {
                    name: 'activitiesDate',
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
                        name: "activitiesId",
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
        await queryRunner.dropTable("timespend")
    }

}
