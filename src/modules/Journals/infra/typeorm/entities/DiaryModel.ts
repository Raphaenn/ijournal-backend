import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";

@Entity('diary')
class DiaryModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    gratitude1: string;

    @Column()
    gratitude2: string;

    @Column()
    gratitude3: string;

    @Column()
    activity1: string;

    @Column()
    activity2: string;

    @Column()
    activity3: string;

    @Column()
    diaryData: Date;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default DiaryModel;