import Router from "express";

import GoalController from "../controllers/GoalController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const goalController = new GoalController();
const goalsRoute = Router();

goalsRoute.use(ensureAuthenticated);
goalsRoute.post("/create", goalController.create);

export default goalsRoute;