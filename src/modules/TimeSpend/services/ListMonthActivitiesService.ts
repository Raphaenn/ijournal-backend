import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import ActivitiesModel from "@modules/TimeSpend/infra/typeorm/entities/ActivitiesModel";
import IActivitiesRepository from "../repositories/IActivitiesRepository";

interface IRequest {
    user_id: string;
    month: number;
    year: number;
}

@injectable()
class ListMonthActivitiesService {
    constructor(
        @inject('ActivitieRepo')
        private activitiesRepository: IActivitiesRepository
    ) {}

    public async execute({user_id, month, year}: IRequest): Promise<ActivitiesModel[] | undefined> {
        const activities = await this.activitiesRepository.findByMonth({user_id, month, year}) ;

        if(!activities) throw new AppError("Activities not found");

        return activities
    }
}


export default ListMonthActivitiesService;