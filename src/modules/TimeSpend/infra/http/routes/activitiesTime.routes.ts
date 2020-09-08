import { Router } from "express";

import ActivitiesController from "../controllers/ActivitiesController";
import ListMonthActivitiesService from "../controllers/ListMonthActivitiesController";
import ListWeekActivitiesController from "../controllers/ListWeekActivitiesController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const activitiesController = new ActivitiesController();
const listMonthActivitiesService = new ListMonthActivitiesService();
const listWeekActivitiesController = new ListWeekActivitiesController();

const activitiesRoutes = Router();

activitiesRoutes.use(ensureAuthenticated);

activitiesRoutes.post("/create", activitiesController.create);
activitiesRoutes.put("/:id", activitiesController.update);
activitiesRoutes.delete("/:id", activitiesController.remove);
activitiesRoutes.get("/month", listMonthActivitiesService.index);
activitiesRoutes.get("/week", listWeekActivitiesController.index);

export default activitiesRoutes;