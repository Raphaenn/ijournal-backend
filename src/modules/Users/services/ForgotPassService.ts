import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import UsersModel from "../infra/typeorm/entities/UserModel";
import IUserRepository from "../repositories/IUserRepository";
import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";

interface IRequest {
    email: string
};

class ForgotPassService {
    constructor(
        private userRepository: IUserRepository,

        private userTokenRepository: IUserTokenRepository
    ) {};


    public async execute({email}: IRequest): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) throw new AppError("user does not exists!");

        const { token } = await this.userTokenRepository.generate(user.id);

        

    }

};


export default ForgotPassService;