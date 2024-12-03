import { Express } from "express";
import { systemConfig } from "../../config/system";
import { dashboardRoute } from "./dashboard.route";
import { musicRoute } from "./music.route";
import { topicRoute } from "./topic.route";
import { accountRouter } from "./account.route";
import { playlistRoute } from "./playlist.route";

const routeAdmin = (app: Express) => {
  const path = systemConfig.prefixAdmin;
  app.use(`/${path}/dashboard`, dashboardRoute);
  app.use(`/${path}/songs`, musicRoute);
  app.use(`/${path}/topics`, topicRoute);
  app.use(`/${path}/playlists`, playlistRoute);
  app.use(`/${path}/accounts`, accountRouter);
};

export default routeAdmin;
