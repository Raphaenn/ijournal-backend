import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import UserModel from "@modules/Users/infra/typeorm/entities/UserModel";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Request {
    user_id: string
    name: string;
    email: string;
    password?: string;
    oldpassword?: string;
}

@injectable()
class UpdateProfileService {

    constructor(
        @inject("UserRepo")
        private userRepository: IUserRepository,

        @inject("hashProvider")
        private hashProvider: IHashProvider
    ) {};

    public async execute({ user_id, name, email, password, oldpassword }: Request): Promise<UserModel> {
        const user = await this.userRepository.findById(user_id);

        if(!user) throw new AppError("User not found");

        const userWithUpdateEmail = await this.userRepository.findByEmail(email);

        if(!userWithUpdateEmail && userWithUpdateEmail !== user.email) throw new AppError("Email already in use");

        user.name = name;
        user.email = email;

        if(password && !oldpassword) throw new AppError("You need to inform the old password to set a new password");

        if(password && oldpassword) {
            const checkOldpass = await this.hashProvider.compareHash(oldpassword, user.password);
            if(!checkOldpass) {
                throw new AppError("OldPassword does not macth");
            }
            user.password = await this.hashProvider.generateHash(password);
        }

        return await this.userRepository.save(user)

    }

}

export default UpdateProfileService;