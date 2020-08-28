import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import DiaryModel from "@modules/Journals/infra/typeorm/entities/DiaryModel";
import IDiaryRepository from "../repositories/IDiaryRepository";

interface IRequest {
    user_id: string;
    diaryData: Date;
}

@injectable()
class FindDiaryService {

    constructor(
        @inject('DiaryRepo')
        private diaryRepository: IDiaryRepository
    ) {}

    public async execute({ user_id, diaryData }: IRequest): Promise<DiaryModel[] | undefined> {

        if(!user_id || !diaryData) throw new AppError("the data was not informed")

        const diaryList = await this.diaryRepository.findAll(user_id, diaryData);
        return diaryList;
    }

}

export default FindDiaryService;