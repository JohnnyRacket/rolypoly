import { Router } from "express";

import rollbacks from "./rollbacks";


const routes = Router();

routes.use("/rollbacks", rollbacks);

const apiRoutes = Router();
apiRoutes.use("/api", routes);

export default apiRoutes;