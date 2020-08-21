import { Router } from "express";

import UsersListController from "../controllers/AdminController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const adminRoute = Router();
const usersListController = new UsersListController();

adminRoute.get("/list", ensureAuthenticated, usersListController.index);
adminRoute.delete("/delete", ensureAuthenticated, usersListController.delete);

export default adminRoute;