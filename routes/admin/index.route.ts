import { Express } from "express";
import { systemConfig } from "../../config/system";
import { dashboardRoute } from "./dashboard.route";

const routeAdmin = (app: Express) => {
  const path = systemConfig.prefixAdmin;
  app.use(`/${path}/dashboard`, dashboardRoute);
}

export default routeAdmin;