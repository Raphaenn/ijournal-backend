import { Router } from "express";

import UsersListController from "../controllers/AdminController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const adminRoute = Router();
const usersListController = new UsersListController();

adminRoute.get("/list", usersListController.index);
adminRoute.delete("/delete", ensureAuthenticated, usersListController.delete);
adminRoute.post("/user", ensureAuthenticated, usersListController.update)

export default adminRoute;