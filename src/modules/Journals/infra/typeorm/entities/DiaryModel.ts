import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import UserModel from "@modules/Users/infra/typeorm/entities/UserModel";

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

    @Column('timestamp with time zone')
    diaryData: Date;

    @Column()
    user_id: string;

    @ManyToOne(() => UserModel)
    @JoinColumn({ name: 'user_id' })
    user: UserModel

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default DiaryModel;