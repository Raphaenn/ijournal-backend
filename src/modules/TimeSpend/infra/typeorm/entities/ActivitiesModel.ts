import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import UserModel from "@modules/Users/infra/typeorm/entities/UserModel";

@Entity('timespend')
class ActivitiesModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    workTime: number;

    @Column()
    sleepTime: number;

    @Column()
    studyTime: number;

    @Column()
    leisureTime: number;

    @Column()
    trainingTime: number;

    @Column('timestamp with time zone')
    activitiesDate: Date;

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

export default ActivitiesModel;