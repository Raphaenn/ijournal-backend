import { injectable, inject } from "tsyringe";
import { getYear } from "date-fns";

import AppError from "@shared/errors/AppError";

import GoalModel from "@modules/Goals/infra/typeorm/entities/GoalModel";
import IGoalRepository from "../repositories/IGoalRepository";
import IGoalDTO from "../dtos/IGoalDTO";

@injectable()
class DiaryCRUDService {
    constructor(
        @inject('GoalRepo')
        private goalRepository: IGoalRepository
    ) {}

    public async execute(data: IGoalDTO): Promise<GoalModel> {

        const goalsList = await this.goalRepository.findAll(data.user_id);

        const goalDate = getYear(new Date(data.startDate));
        const yearNow = getYear(Date.now())

        if(goalDate < yearNow) throw new AppError("You can't create a goal for a pass year!");

        if(goalsList && goalsList?.length >= 15) throw new AppError("You can only register 15 goals per year", 401)

        const createDiary = await this.goalRepository.create(data);

        return createDiary;
    };

    public async update(newGoal: GoalModel): Promise<GoalModel> {
        const Oldgoal = await this.goalRepository.findOne(newGoal.id);

        if(!Oldgoal) throw new AppError("Goal not found"); 

        Oldgoal.description = newGoal.description;
        Oldgoal.group = newGoal.group;
        Oldgoal.status = newGoal.status;
        Oldgoal.startDate = newGoal.startDate;
        Oldgoal.deadDate = newGoal.deadDate;

        return await this.goalRepository.save(Oldgoal)
    };

    public async delete(goalId: string): Promise<void> {
        const goal = await this.goalRepository.findOne(goalId);

        if(!goal) throw new AppError("Goal not found");

        await this.goalRepository.exclude(goal);

    };
}

export default DiaryCRUDService;