import DiaryModel from "../infra/typeorm/entities/DiaryModel";
import IDiaryDTO from "../dtos/IDiaryDTO";

export default interface IDiaryRepository {
    create(data: IDiaryDTO): Promise<DiaryModel>;
    findByDate(user_id: string, date: Date): Promise<DiaryModel | undefined>;
    findOne(diaryId: string): Promise<DiaryModel | undefined>;
    exclude(diary: DiaryModel): Promise<void>;
    save(diary: DiaryModel): Promise<DiaryModel>;
}