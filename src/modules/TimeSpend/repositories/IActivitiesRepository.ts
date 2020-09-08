import ActivitiesModel from "../infra/typeorm/entities/ActivitiesModel";
import IActivitiesDTOS from "../dtos/IActivitiesDTOS";
import IFindAllInMonthDTO from "../dtos/IFindAllInMonthDTO";
import IFindAllInWeekDTO from "../dtos/IFindAllInWeekDTO";

export default interface IActivitiesRepository {
    create(data: IActivitiesDTOS): Promise<ActivitiesModel>;
    findByDate(user_id: string, date: string): Promise<ActivitiesModel[] | undefined>;
    // findByYear(user_id: string, year: number): Promise<ActivitiesModel[] | undefined>;
    findByMonth(data: IFindAllInMonthDTO): Promise<ActivitiesModel[] | undefined>;
    findWeek(data: IFindAllInWeekDTO): Promise<ActivitiesModel[] | undefined>;
    findOne(goalId: string): Promise<ActivitiesModel | undefined>;
    exclude(activity: ActivitiesModel): Promise<void>;
    save(activity: ActivitiesModel): Promise<ActivitiesModel>;
}