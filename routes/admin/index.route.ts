import { Express } from "express";
import { systemConfig } from "../../config/system";
import { dashboardRoute } from "./dashboard.route";
import { musicRoute } from "./music.route";
import { topicRoute } from "./topic.route";
const routeAdmin = (app: Express) => {
  const path = systemConfig.prefixAdmin;
  app.use(`/${path}/dashboard`, dashboardRoute);
  app.use(`/${path}/songs`, musicRoute);
  app.use(`/${path}/topics`, topicRoute);
};

export default routeAdmin;
