import ActivitiesModel from "../infra/typeorm/entities/ActivitiesModel";
import IActivitiesDTOS from "../dtos/IActivitiesDTOS";

export default interface IActivitiesRepository {
    create(data: IActivitiesDTOS): Promise<ActivitiesModel>;
    findByDate(user_id: string, date: string): Promise<ActivitiesModel[] | undefined>;
    // findByYear(user_id: string, year: number): Promise<ActivitiesModel[] | undefined>;
    // findWeek(user_id: string): Promise<ActivitiesModel[] | undefined>;
    // findOne(goalId: string): Promise<ActivitiesModel | undefined>;
    // exclude(goal: ActivitiesModel): Promise<void>;
    // save(goals: ActivitiesModel): Promise<ActivitiesModel>;
}