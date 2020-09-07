import { Router } from "express";

import ActivitiesController from "../controllers/ActivitiesController";
// import ListDiaryController from "../controllers/ListDiaryController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const activitiesController = new ActivitiesController();
// const listDiaryController = new ListDiaryController();

const activitiesRoutes = Router();

activitiesRoutes.use(ensureAuthenticated);

activitiesRoutes.post("/create", activitiesController.create);
// diaryRoute.get("/list", listDiaryController.index);
// diaryRoute.put("/:id", diaryController.update);
// diaryRoute.delete("/:id", diaryController.remove)

export default activitiesRoutes;