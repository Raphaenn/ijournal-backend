import Router from "express";

import GoalController from "../controllers/GoalController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const goalController = new GoalController();
const goalsRoute = Router();

goalsRoute.use(ensureAuthenticated);
goalsRoute.post("/create", goalController.create);
goalsRoute.put("/:id", goalController.update);
goalsRoute.delete("/:id", goalController.remove);

export default goalsRoute;