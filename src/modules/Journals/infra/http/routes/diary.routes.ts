import { Router } from "express";

import DiaryController from "../controllers/DiaryController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const diaryController = new DiaryController();

const diaryRoute = Router();

diaryRoute.use(ensureAuthenticated);

diaryRoute.post("/create", diaryController.create);

export default diaryRoute;