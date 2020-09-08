import { injectable, inject } from "tsyringe";
import { format } from "date-fns";

import AppError from "@shared/errors/AppError";

import ActivitiesModel from "@modules/TimeSpend/infra/typeorm/entities/ActivitiesModel";
import IActivitiesRepository from "../repositories/IActivitiesRepository";
import IActivitiesDTOS from "../dtos/IActivitiesDTOS";

@injectable()
class ActivitiesCRUDService {
    constructor(
        @inject('ActivitieRepo')
        private activitiesRepository: IActivitiesRepository
    ) {}

    public async execute(data: IActivitiesDTOS): Promise<ActivitiesModel> {

        // Ver todos as atividades do usuário e não deixar cadastrar duas vezes na mesma data.
        const formatedDate = format(new Date(data.activitiesDate), "dd-MM-yyyy");
        const currentDate = format(new Date(Date.now()), "dd-MM-yyyy");

        const activities = await this.activitiesRepository.findByDate(data.user_id, formatedDate);

        if(activities && activities?.length) throw new AppError("You cannot register two activities on the same day.");

        // Soma das atividades não pode passar de 24 horas no dia.
        const summation = (data.leisureTime + data.sleepTime + data.studyTime + data.trainingTime + data.workTime);

        if(summation > 24) throw new AppError("Sum of activities cannot exceed 24 hours.", 401);
        
        // Verificar se a data já passou ou é no futuro. 
        if(formatedDate > currentDate) throw new AppError("You cannot register an activitie in the future");

        try {
            const  saveActivitie = await this.activitiesRepository.create(data);

            return saveActivitie;

        } catch (error) {
            throw new AppError(error)
        }
    };

    // public async update(newGoal: GoalModel): Promise<GoalModel> {
    //     const Oldgoal = await this.goalRepository.findOne(newGoal.id);

    //     if(!Oldgoal) throw new AppError("Goal not found"); 

    //     Oldgoal.description = newGoal.description;
    //     Oldgoal.group = newGoal.group;
    //     Oldgoal.status = newGoal.status;
    //     Oldgoal.startDate = newGoal.startDate;
    //     Oldgoal.deadDate = newGoal.deadDate;

    //     return await this.goalRepository.save(Oldgoal)
    // };

    // public async delete(goalId: string): Promise<void> {
    //     const goal = await this.goalRepository.findOne(goalId);

    //     if(!goal) throw new AppError("Goal not found");

    //     await this.goalRepository.exclude(goal);

    // };
}

export default ActivitiesCRUDService;