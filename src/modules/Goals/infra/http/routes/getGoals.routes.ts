import Router from "express";

import ListGoalController from "../controllers/ListGoalController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const listGoalController = new ListGoalController();
const getgoalsRoute = Router();

getgoalsRoute.use(ensureAuthenticated);
getgoalsRoute.get("/", listGoalController.index);

export default getgoalsRoute;