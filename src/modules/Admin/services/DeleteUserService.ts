import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IUserRepository from "@modules/Users/repositories/IUserRepository";
// import UserModel from "@modules/Users/infra/typeorm/entities/UserModel";

@injectable()
class DeleteUserService {
    constructor(
        @inject("UserRepo")
        private userRepository: IUserRepository
    ) {}

    public async execute(user_id: string): Promise<void> {
        const user = await this.userRepository.findById(user_id);

        if(!user) throw new AppError("User not found", 401);

        await this.userRepository.exclude(user)
    }

}

export default DeleteUserService;