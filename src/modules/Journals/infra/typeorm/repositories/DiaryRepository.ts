import { getRepository, Repository, Raw } from "typeorm";

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

    public async findByDate(user_id: string, data: Date): Promise<DiaryModel | undefined> {
        const month = new Date(data).getMonth() + 1;
        const year = new Date(data).getFullYear();
        const parsedMonth = String(month).padStart(2, '0');

        const findDiary = await this.ormRepo.findOne({
            where: { 
                user_id, 
                diaryData: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
                ),
            }
        })

        return findDiary
    };

    public async findOne(diaryId: string): Promise<DiaryModel | undefined> {
        const findDiary = await this.ormRepo.findOne({
            where: { id: diaryId}
        });

        return findDiary;
    }

    public async save(diary: DiaryModel): Promise<DiaryModel> {
        return this.ormRepo.save(diary);
    };

    public async exclude(diary: DiaryModel): Promise<void> {
        await this.ormRepo.remove(diary);
    }

}

export default DiaryRepository;