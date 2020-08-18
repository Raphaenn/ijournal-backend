import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IUserRepository from "@modules/Users/repositories/IUserRepository";
import UserModel from "@modules/Users/infra/typeorm/entities/UserModel";

@injectable()
class ListUserService {
    constructor(
        @inject("UserRepo")
        private userRepository: IUserRepository
    ) {};

    public async execute(): Promise<UserModel[]> {
        const user = await this.userRepository.findAll()

        if(user.length < 0) throw new AppError("Nothing to show");

        return user;
    }
}

export default ListUserService;