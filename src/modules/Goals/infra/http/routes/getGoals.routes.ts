import Router from "express";

import ListGoalController from "../controllers/ListGoalController";
import CategoriesController from "../controllers/CategoriesController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const listGoalController = new ListGoalController();
const categoriesController = new CategoriesController();
const getgoalsRoute = Router();

getgoalsRoute.use(ensureAuthenticated);
getgoalsRoute.get("/", listGoalController.index);
getgoalsRoute.get("/category", categoriesController.index)

export default getgoalsRoute;