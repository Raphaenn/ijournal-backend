import { Router } from "express";

import userRoute from "@modules/Users/infra/http/routes/users.routes";
import sessionsRoute from "@modules/Users/infra/http/routes/sessions.routes";

const routes = Router();

routes.use('/sessions', sessionsRoute);
routes.use('/users', userRoute);

export default routes;