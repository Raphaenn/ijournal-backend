import { container } from "tsyringe";

import "@modules/Users/providers";
import "./providers";

import IUserRepository from "@modules/Users/repositories/IUserRepository";
import UsersRepository from "@modules/Users/infra/typeorm/repositories/UsersRepository";
import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";
import UserTokenRepository from "@modules/Users/infra/typeorm/repositories/UserTokenRepository";

import IDiaryRepository from "@modules/Journals/repositories/IDiaryRepository";
import DiaryRepository from "@modules/Journals/infra/typeorm/repositories/DiaryRepository";

import IGoalRepository from "@modules/Goals/repositories/IGoalRepository";
import GoalRepository from "@modules/Goals/infra/typeorm/repositories/GoalRepository";

container.registerSingleton<IUserRepository>('UserRepo', UsersRepository);
container.registerSingleton<IUserTokenRepository>("UsersTokensRepo", UserTokenRepository);
container.registerSingleton<IDiaryRepository>("DiaryRepo", DiaryRepository);
container.registerSingleton<IGoalRepository>("GoalRepo", GoalRepository);