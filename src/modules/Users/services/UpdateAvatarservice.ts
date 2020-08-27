import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import UsersModel from "../infra/typeorm/entities/UserModel";
import IUserRepository from "../repositories/IUserRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface IRequest {
    user_id: string;
    avatarname: string
}


@injectable()
class UpdateAvatarservice {

    constructor(
        @inject("UserRepo")
        private userRepository: IUserRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}

    public async execute({ user_id, avatarname }: IRequest): Promise<UsersModel> {
        const user = await this.userRepository.findById(user_id);

        if(!user) throw new AppError("Only authenticate users can change the avatar", 401);

        if(user.avatar) await this.storageProvider.deleteFile(user.avatar);

        const fileName = await this.storageProvider.saveFile(avatarname);

        user.avatar = fileName;

        await this.userRepository.save(user);

        return user;
    }

}

export default UpdateAvatarservice;