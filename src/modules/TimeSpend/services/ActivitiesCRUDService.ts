import { injectable, inject } from "tsyringe";
import { format } from "date-fns";

import AppError from "@shared/errors/AppError";

import ActivitiesModel from "@modules/TimeSpend/infra/typeorm/entities/ActivitiesModel";
import IActivitiesRepository from "../repositories/IActivitiesRepository";
import IActivitiesDTOS from "../dtos/IActivitiesDTOS";

@injectable()
class ActivitiesCRUDService {
    constructor(
        @inject('ActivitieRepo')
        private activitiesRepository: IActivitiesRepository
    ) {}

    public async execute(data: IActivitiesDTOS): Promise<ActivitiesModel> {

        // Ver todos as atividades do usuário e não deixar cadastrar duas vezes na mesma data.
        const formatedDate = format(new Date(data.activitiesDate), "dd-MM-yyyy");
        const currentDate = format(new Date(Date.now()), "dd-MM-yyyy");

        const activities = await this.activitiesRepository.findByDate(data.user_id, formatedDate);

        if(activities && activities?.length) throw new AppError("You cannot register two activities on the same day.");

        // Soma das atividades não pode passar de 24 horas no dia.
        const summation = (data.leisureTime + data.sleepTime + data.studyTime + data.trainingTime + data.workTime);

        if(summation > 24) throw new AppError("Sum of activities cannot exceed 24 hours.", 401);
        
        // Verificar se a data já passou ou é no futuro. 
        if(formatedDate > currentDate) throw new AppError("You cannot register an activitie in the future");

        try {
            const  saveActivitie = await this.activitiesRepository.create(data);

            return saveActivitie;

        } catch (error) {
            throw new AppError(error)
        }
    };

    public async update(activity: ActivitiesModel): Promise<ActivitiesModel> {
        const getActivity = await this.activitiesRepository.findOne(activity.id);

        const formatedDate = format(new Date(activity.activitiesDate), "dd-MM-yyyy");
        const currentDate = format(new Date(Date.now()), "dd-MM-yyyy");

        const activities = await this.activitiesRepository.findByDate(activity.user_id, formatedDate);

        if(activities && activities?.length) throw new AppError("You cannot register two activities on the same day.");

        const summation = (activity.leisureTime + activity.sleepTime + activity.studyTime + activity.trainingTime + activity.workTime);

        if(summation > 24) throw new AppError("Sum of activities cannot exceed 24 hours.", 401);
        
        if(formatedDate > currentDate) throw new AppError("You cannot register an activitie in the future");

        if(!getActivity) throw new AppError("Activity not found"); 

        getActivity.workTime = activity.workTime;
        getActivity.studyTime = activity.studyTime;
        getActivity.sleepTime = activity.sleepTime;
        getActivity.leisureTime = activity.leisureTime;
        getActivity.trainingTime = activity.trainingTime;
        
        return await this.activitiesRepository.save(getActivity)
    };

    public async delete(activityId: string): Promise<void> {
        const getActivity = await this.activitiesRepository.findOne(activityId);

        if(!getActivity) throw new AppError("Activity not found"); 

        await this.activitiesRepository.exclude(getActivity)

    };
}

export default ActivitiesCRUDService;