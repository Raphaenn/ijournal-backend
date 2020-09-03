import { Router } from "express";

import DiaryController from "../controllers/DiaryController";
import ListDiaryController from "../controllers/ListDiaryController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const diaryController = new DiaryController();
const listDiaryController = new ListDiaryController();

const diaryRoute = Router();

diaryRoute.use(ensureAuthenticated);

diaryRoute.post("/create", diaryController.create);
diaryRoute.get("/list", listDiaryController.index);
diaryRoute.put("/:id", diaryController.update)

export default diaryRoute;