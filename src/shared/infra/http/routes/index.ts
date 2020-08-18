import { Router } from "express";

import userRoute from "@modules/Users/infra/http/routes/users.routes";
import sessionsRoute from "@modules/Users/infra/http/routes/sessions.routes";
import profileRoute from "@modules/Users/infra/http/routes/profile.routes"
import passwordRouter from "@modules/Users/infra/http/routes/password.routes";
import adminRoute from "@modules/Admin/infra/http/routes/admin.routes";

const routes = Router();

routes.use('/sessions', sessionsRoute);
routes.use('/users', userRoute);
routes.use('/profile', profileRoute);
routes.use('/password', passwordRouter);
routes.use("/admin", adminRoute)

export default routes;