import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import GoalModel from "../infra/typeorm/entities/GoalModel";
import IGoalRepository from "../repositories/IGoalRepository";

interface IRequest {
    user_id: string;
    group: string;
    year: number;
}


@injectable()
class CategoriesGoalsService {
    constructor(
        @inject('GoalRepo')
        private goalRepository: IGoalRepository
    ) {}

    public async execute({ user_id, group, year }: IRequest): Promise<GoalModel[] | undefined> {
        const findGoal = await this.goalRepository.findByCategory(user_id, group, year);

        if(!findGoal) throw new AppError("List not found", 401);

        return findGoal;
    };

}

export default CategoriesGoalsService;