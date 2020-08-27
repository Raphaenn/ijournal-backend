import DiaryModel from "../infra/typeorm/entities/DiaryModel";
import IDiaryDTO from "../dtos/IDiaryDTO";

export default interface IDiaryRepository {
    create(data: IDiaryDTO): Promise<DiaryModel>;
    findAll(): Promise<DiaryModel[] | undefined>;
    findByDate(date: Date): Promise<DiaryModel | undefined>;
}