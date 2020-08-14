import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";

import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";

import UserModel from "../infra/typeorm/entities/UserModel";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
 
interface Request {
    email: string;
    password: string;
}

interface Response {
    user: UserModel;
    token: string
}

@injectable()
class AuthenticateService {

    constructor(
        @inject("UserRepo")
        private userRepository: IUserRepository,

        @inject("hashProvider")
        private hashProvider: IHashProvider
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) throw new AppError("Incorrect email/password combination", 401);

        const passwordMatch = await this.hashProvider.compareHash(password, user.password);

        if(!passwordMatch) throw new AppError("Invalid password", 401);

        const { expiresIn, secret } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn
        });

        return {
            user,
            token
        }

    }

}

export default AuthenticateService;