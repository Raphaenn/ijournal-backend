import { injectable, inject } from "tsyringe";
import path from "path";

import AppError from "@shared/errors/AppError";
import UsersModel from "../infra/typeorm/entities/UserModel";
import IUserRepository from "../repositories/IUserRepository";
import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";
import IMailproviders from "@shared/container/providers/MailProvider/models/IMailproviders";

interface IRequest {
    email: string
};

@injectable()
class ForgotPassService {
    constructor(
        @inject("UserRepo")
        private userRepository: IUserRepository,

        @inject("UsersTokensRepo")
        private userTokenRepository: IUserTokenRepository,

        @inject("Mailproviders")
        private mailproviders: IMailproviders
    ) {};


    public async execute({email}: IRequest): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) throw new AppError("user does not exists!");

        const { token } = await this.userTokenRepository.generate(user.id);
        const forgotPassTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await this.mailproviders.sendEMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: "[Gobarber] Recuperação de senha",
            templateData: {
                file: forgotPassTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
                }
            }
        });

    }

};


export default ForgotPassService;