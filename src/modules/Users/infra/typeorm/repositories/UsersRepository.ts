import { getRepository, Repository } from "typeorm";

import IUserRepository from "@modules/Users/repositories/IUserRepository";
import UsersModel from "@modules/Users/infra/typeorm/entities/UserModel";
import ICreateUserDTO from "@modules/Users/dtos/ICreateUserDTO";

class UsersRepository implements IUserRepository {
    private ormRepo: Repository<UsersModel>

    constructor() {
        this.ormRepo = getRepository(UsersModel)
    }

    public async findAll(): Promise<UsersModel[] | undefined> {
        const allusers = await this.ormRepo.find()

        return allusers
    };

    public async findByEmail(email: string): Promise<UsersModel | undefined> {
        const user = await this.ormRepo.findOne({
            where: { email }
        });

        return user
    };

    public async findById(id: string): Promise<UsersModel | undefined> {
        const user = await this.ormRepo.findOne(id);

        return user;
    };

    public async create(userData: ICreateUserDTO): Promise<UsersModel> {
        const userCreated = this.ormRepo.create(userData);

        await this.ormRepo.save(userCreated);

        return userCreated
    };

    public async save(user: UsersModel): Promise<UsersModel> {

        return this.ormRepo.save(user);
    };

    public async exclude(user: UsersModel): Promise<void> {
        await this.ormRepo.remove(user);
    }

}

export default UsersRepository;