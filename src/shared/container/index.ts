import { container } from "tsyringe";

import "@modules/Users/providers";

import IUserRepository from "@modules/Users/repositories/IUserRepository";
import UsersRepository from "@modules/Users/infra/typeorm/repositories/UsersRepository";

container.registerSingleton<IUserRepository>('UserRepo', UsersRepository);