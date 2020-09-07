import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import GoalModel from "../infra/typeorm/entities/GoalModel";
import IGoalRepository from "../repositories/IGoalRepository";

interface IRequest {
    user_id: string;
    year: number;
}

@injectable()
class FindYearGoal {

    constructor(
        @inject('GoalRepo')
        private goalRepository: IGoalRepository
    ) {}

    public async execute({ user_id, year }: IRequest): Promise<GoalModel[] | undefined> {

        const findGoal = await this.goalRepository.findByYear(user_id, year);

        if(!findGoal) throw new AppError("The goal was not found");

        return findGoal;
    }
}

export default FindYearGoal;