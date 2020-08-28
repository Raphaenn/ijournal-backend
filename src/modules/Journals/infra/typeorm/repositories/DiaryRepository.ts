import { getRepository, Repository } from "typeorm";

import IDiaryRepository from "@modules/Journals/repositories/IDiaryRepository";
import DiaryModel from "../entities/DiaryModel";
import IDiaryDTO from "@modules/Journals/dtos/IDiaryDTO";

class DiaryRepository implements IDiaryRepository {

    private ormRepo: Repository<DiaryModel>

    constructor() {
        this.ormRepo = getRepository(DiaryModel);
    }

    public async create(data: IDiaryDTO): Promise<DiaryModel> {
        const diary = this.ormRepo.create(data);

        await this.ormRepo.save(diary)

        return diary;
    };

    public async findAll(): Promise<DiaryModel[] | undefined> {
        const allDiaries = await this.ormRepo.find()

        return allDiaries
    };

    public async findByDate(date: Date): Promise<DiaryModel | undefined> {
        const findDiary = await this.ormRepo.findOne({
            where: { diaryData: date },
        });

        return findDiary || undefined;
    };

}

export default DiaryRepository;