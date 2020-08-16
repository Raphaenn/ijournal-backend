import { container } from "tsyringe";

import "@modules/Users/providers";
import "./providers";

import IUserRepository from "@modules/Users/repositories/IUserRepository";
import UsersRepository from "@modules/Users/infra/typeorm/repositories/UsersRepository";
import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";
import UserTokenRepository from "@modules/Users/infra/typeorm/repositories/UserTokenRepository"

container.registerSingleton<IUserRepository>('UserRepo', UsersRepository);
container.registerSingleton<IUserTokenRepository>("UsersTokensRepo", UserTokenRepository);