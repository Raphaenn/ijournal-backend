import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import DiaryModel from "@modules/Journals/infra/typeorm/entities/DiaryModel";
import IDiaryRepository from "../repositories/IDiaryRepository";
import IDiaryDTO from "../dtos/IDiaryDTO";

@injectable()
class PostService {
    constructor(
        @inject('DiaryRepo')
        private diaryRepository: IDiaryRepository
    ) {}

    public async execute(data: IDiaryDTO): Promise<DiaryModel> {

        const diaryDate = await this.diaryRepository.findByDate(data.diaryData);

        if(diaryDate) throw new AppError("You can only creete a diary for day.", 401);

        const createDiary = await this.diaryRepository.create(data);

        return createDiary;
    }
}

export default PostService;