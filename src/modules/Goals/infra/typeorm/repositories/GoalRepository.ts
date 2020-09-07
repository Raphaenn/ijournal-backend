import { getRepository, Repository, Raw } from "typeorm";

import IGoalRepository from "@modules/Goals/repositories/IGoalRepository";
import GoalModel from "../entities/GoalModel";
import IGoalDTO from "@modules/Goals/dtos/IGoalDTO"

class GoalRepository implements IGoalRepository {

    private ormRepo: Repository<GoalModel>

    constructor() {
        this.ormRepo = getRepository(GoalModel)
    }

    public async create(data: IGoalDTO): Promise<GoalModel> {
        const goal = this.ormRepo.create(data);
        await this.ormRepo.save(goal);

        return goal;
    }

    public async findAll(user_id: string): Promise<GoalModel[] | undefined> {
        const allgoals = await this.ormRepo.find({
            where: { user_id }
        });

        return allgoals;
    }

    public async findOne(goalId: string): Promise<GoalModel | undefined> {
        const goalData = await this.ormRepo.findOne({
            where: { id: goalId }
        });

        return goalData;
    }

    public async findByYear(user_id: string, year: number): Promise<GoalModel[] | undefined> {

        
        const yearGoals = await this.ormRepo.find({
            where: {
                user_id,
                startDate: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'YYYY') = '${year}'`
                ),
            }
        });

        return yearGoals
    }

    public async exclude(goal: GoalModel): Promise<void> {
        await this.ormRepo.remove(goal) ;
    }

    public async save(goals: GoalModel): Promise<GoalModel> {
        return await this.ormRepo.save(goals)
    }
}

export default GoalRepository;