import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import UsersModel from "../infra/typeorm/entities/UserModel";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject("UserRepo")
        private userRepository: IUserRepository,

        @inject("hashProvider")
        private hashProvider: IHashProvider
    ) {}

    public async execute({ name, email, password }: Request): Promise<UsersModel> {
        const checkUserExists = await this.userRepository.findByEmail(email);

        if(checkUserExists) throw new AppError('Email already used')

        const hashedPassword = await this.hashProvider.generateHash(password)

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            planLevel: "default"
        });

        await this.userRepository.save(user)

        return user;
    }
}

export default CreateUserService;