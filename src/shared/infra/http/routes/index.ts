import { Router } from "express";

import userRoute from "@modules/Users/infra/http/routes/users.routes";
import sessionsRoute from "@modules/Users/infra/http/routes/sessions.routes";
import profileRoute from "@modules/Users/infra/http/routes/profile.routes"

const routes = Router();

routes.use('/sessions', sessionsRoute);
routes.use('/users', userRoute);
routes.use('/profile', profileRoute)

export default routes;