import { getRepository, Repository, Raw } from "typeorm";

import ActivitiesModel from "../entities/ActivitiesModel";
import IActivitiesRepository from "@modules/TimeSpend/repositories/IActivitiesRepository";
import IActivitiesDTOS from "@modules/TimeSpend/dtos/IActivitiesDTOS";
import IFindAllInMonthDTO from "@modules/TimeSpend/dtos/IFindAllInMonthDTO";
import IFindAllInWeekDTO from "@modules/TimeSpend/dtos/IFindAllInWeekDTO";

class ActivitiesRepository implements IActivitiesRepository {

    private ormRepo: Repository<ActivitiesModel>

    constructor() {
        this.ormRepo = getRepository(ActivitiesModel)
    };

    public async create(data: IActivitiesDTOS): Promise<ActivitiesModel> {
        const activities = this.ormRepo.create(data);
        await this.ormRepo.save(activities);

        return activities;
    }

    public async findByDate(user_id: string, date: string): Promise<ActivitiesModel[] | undefined> {
        const activities = await this.ormRepo.find({
            where: { 
                user_id,
                activitiesDate: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${date}'`
                ),
            }
        })

        return activities;
    }

    public async findOne(goalId: string): Promise<ActivitiesModel | undefined> {
        const activities = await this.ormRepo.findOne({
            where: { id: goalId }
        });

        return activities
    }

    public async exclude(activity: ActivitiesModel): Promise<void> {
        await this.ormRepo.remove(activity)
    }

    public async save(activity: ActivitiesModel): Promise<ActivitiesModel> {
        return await this.ormRepo.save(activity)
    }

    public async findByMonth({user_id, month, year}: IFindAllInMonthDTO): Promise<ActivitiesModel[] | undefined> {
        const parsedMonth = String(month).padStart(2, '0');
        const activities = await this.ormRepo.find({
            where: {
                user_id,
                activitiesDate: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
                ),
            }
        })

        return activities;
    };

    public async findWeek({user_id, year, week}: IFindAllInWeekDTO): Promise<ActivitiesModel[] | undefined> {

        const activities = await this.ormRepo.find({
            where: {
                user_id,
                activitiesDate: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'IYYY-IW') = '${year}-${week}'`
                ),
            }
        });

        return activities;
    };

}

export default ActivitiesRepository;