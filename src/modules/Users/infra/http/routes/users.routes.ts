import { Router } from "express";

import UsersController from "../controllers/UsersControllers";

const usersController = new UsersController();

const userRoute = Router();

userRoute.post("/", usersController.create);

export default userRoute;