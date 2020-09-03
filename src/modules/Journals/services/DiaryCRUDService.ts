import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import DiaryModel from "@modules/Journals/infra/typeorm/entities/DiaryModel";
import IDiaryRepository from "../repositories/IDiaryRepository";
import IDiaryDTO from "../dtos/IDiaryDTO";

@injectable()
class DiaryCRUDService {
    constructor(
        @inject('DiaryRepo')
        private diaryRepository: IDiaryRepository
    ) {}

    public async execute(data: IDiaryDTO): Promise<DiaryModel> {

        const diaryDate = await this.diaryRepository.findByDate(data.user_id, data.diaryData);

        if(diaryDate) throw new AppError("You can only creete a diary for day.", 401);

        const setDate = new Date(data.diaryData);

        if(setDate.getDate() < new Date().getDate() - 1) throw new AppError("You can't create a diary if past more then 1 day");

        if(setDate.getDate() > new Date().getDate() - 1) throw new AppError("You can't create a diary in the future");

        const createDiary = await this.diaryRepository.create(data);

        return createDiary;
    };

    public async update(diarydata: DiaryModel): Promise<DiaryModel> {
        const diary = await this.diaryRepository.findOne(diarydata.id);

        if(!diary) throw new AppError("Diary not found");

        diary.activity1 = diarydata.activity1;
        diary.activity2 = diarydata.activity2;
        diary.activity3 = diarydata.activity3;
        diary.gratitude1 = diarydata.gratitude1;
        diary.gratitude2 = diarydata.gratitude2;
        diary.gratitude3 = diarydata.gratitude3;

        return await this.diaryRepository.save(diary);
    };

    public async delete(diaryId: string): Promise<void> {
        const diary = await this.diaryRepository.findOne(diaryId);

        if(!diary) throw new AppError("Diary not found");

        await this.diaryRepository.exclude(diary);

    };
}

export default DiaryCRUDService;