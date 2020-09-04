import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import UserModel from "@modules/Users/infra/typeorm/entities/UserModel";

@Entity('goals')
class GoalModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    description: string;

    @Column()
    status: string;

    @Column()
    group: string;

    @Column('timestamp with time zone')
    startDate: Date;

    @Column('timestamp with time zone')
    deadDate: Date;

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

export default GoalModel;