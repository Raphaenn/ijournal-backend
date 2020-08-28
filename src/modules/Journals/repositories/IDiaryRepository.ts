import DiaryModel from "../infra/typeorm/entities/DiaryModel";
import IDiaryDTO from "../dtos/IDiaryDTO";

export default interface IDiaryRepository {
    create(data: IDiaryDTO): Promise<DiaryModel>;
    findAll(user_id: string, date: Date): Promise<DiaryModel[] | undefined>;
    findByDate(user_id: string, date: Date): Promise<DiaryModel | undefined>;
}