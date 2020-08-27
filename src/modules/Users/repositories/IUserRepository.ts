import UsersModel from "../infra/typeorm/entities/UserModel";
import ICreateUserDTO from "@modules/Users/dtos/ICreateUserDTO";

export default interface IUserRepository {
    findAll(): Promise<UsersModel[] | undefined>
    findById(id: string): Promise<UsersModel | undefined>; 
    findByEmail(email: string): Promise< UsersModel | undefined>;
    create(data: ICreateUserDTO): Promise<UsersModel>;
    exclude(user: UsersModel): Promise<void>;
    save(user: UsersModel): Promise<UsersModel>;
};