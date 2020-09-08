import { injectable, inject } from "tsyringe";
import { getISOWeek } from "date-fns"

import AppError from "@shared/errors/AppError";

import ActivitiesModel from "@modules/TimeSpend/infra/typeorm/entities/ActivitiesModel";
import IActivitiesRepository from "../repositories/IActivitiesRepository";

interface IRequest {
    user_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListWeekActivitiesservice {
    constructor(
        @inject('ActivitieRepo')
        private activitiesRepository: IActivitiesRepository
    ) {}

    public async execute({user_id, day, month, year}: IRequest): Promise<ActivitiesModel[] | undefined> {

        const week = getISOWeek(new Date(year, month-1, day))
        const activities = await this.activitiesRepository.findWeek({user_id, year, week}) ;

        if(!activities) throw new AppError("Activities not found");

        return activities
    }
}


export default ListWeekActivitiesservice;