import { getRepository, Repository, Raw } from "typeorm";

import ActivitiesModel from "../entities/ActivitiesModel";
import IActivitiesRepository from "@modules/TimeSpend/repositories/IActivitiesRepository";
import IActivitiesDTOS from "@modules/TimeSpend/dtos/IActivitiesDTOS";

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

}

export default ActivitiesRepository;