import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import ProfileController from "../controllers/ProfileController";

const profileRoute = Router();

const profileController = new ProfileController()

profileRoute.use(ensureAuthenticated)
profileRoute.post("/", profileController.update)


export default profileRoute;