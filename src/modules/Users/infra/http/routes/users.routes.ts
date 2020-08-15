import { Router } from "express";
import multer from "multer";

import UsersController from "../controllers/UsersControllers";
import UpdateAvatarController from "../controllers/UpdateAvatarController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import uploadConfig from "@config/upload";

const usersController = new UsersController();
const updateAvatarController = new UpdateAvatarController();
const upload = multer(uploadConfig.multer);

const userRoute = Router();

userRoute.post("/", usersController.create);

userRoute.patch('/avatar', ensureAuthenticated, upload.single('avatar'), updateAvatarController.create)

export default userRoute;