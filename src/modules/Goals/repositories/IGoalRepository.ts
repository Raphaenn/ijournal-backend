import GoalModel from "../infra/typeorm/entities/GoalModel";
import IGoalDTO from "../dtos/IGoalDTO";

export default interface IDiaryRepository {
    create(data: IGoalDTO): Promise<GoalModel>;
    findByYear(user_id: string, date: Date): Promise<GoalModel[] | undefined>;
    findAll(user_id: string): Promise<GoalModel[] | undefined>;
    findOne(goalId: string): Promise<GoalModel | undefined>;
    exclude(goal: GoalModel): Promise<void>;
    save(goals: GoalModel): Promise<GoalModel>;
}