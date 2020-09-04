import { injectable, inject } from "tsyringe";
import { startOfHour, isBefore, getYear, format } from "date-fns";

import AppError from "@shared/errors/AppError";

import GoalModel from "@modules/Goals/infra/typeorm/entities/GoalModel";
import IGoalRepository from "../repositories/IGoalRepository";
import IGoalDTO from "../dtos/IGoalDTO";

@injectable()
class DiaryCRUDService {
    constructor(
        @inject('GoalRepo')
        private goalRepository: IGoalRepository
    ) {}

    public async execute(data: IGoalDTO): Promise<GoalModel> {

        const goalsList = await this.goalRepository.findAll(data.user_id);

        const goalDate = getYear(new Date(data.startDate));
        const yearNow = getYear(Date.now())

        if(goalDate < yearNow) throw new AppError("You can't create a goal for a pass year!");

        if(goalsList && goalsList?.length >= 15) throw new AppError("You can only register 15 goals per year", 401)

        const createDiary = await this.goalRepository.create(data);

        return createDiary;
    };

    public async update(goals: GoalModel): Promise<void> {
        // const diary = await this.diaryRepository.findOne(diarydata.id);

        // if(!diary) throw new AppError("Diary not found");

        // diary.activity1 = diarydata.activity1;
        // diary.activity2 = diarydata.activity2;
        // diary.activity3 = diarydata.activity3;
        // diary.gratitude1 = diarydata.gratitude1;
        // diary.gratitude2 = diarydata.gratitude2;
        // diary.gratitude3 = diarydata.gratitude3;

        // return await this.diaryRepository.save(diary);
    };

    public async delete(goalId: string): Promise<void> {
        // const diary = await this.diaryRepository.findOne(diaryId);

        // if(!diary) throw new AppError("Diary not found");

        // await this.diaryRepository.exclude(diary);

    };
}

export default DiaryCRUDService;