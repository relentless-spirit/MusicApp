import { systemConfig } from "../../config/system.js";
import { dashboardRoute } from "./dashboard.route.js";
import { musicRoute } from "./music.route.js";
import { topicRoute } from "./topic.route.js";
import { accountRouter } from "./account.route.js";
import { playlistRoute } from "./playlist.route.js";
const routeAdmin = (app) => {
  const path = systemConfig.prefixAdmin;
  app.use(`/${path}/dashboard`, dashboardRoute);
  app.use(`/${path}/songs`, musicRoute);
  app.use(`/${path}/topics`, topicRoute);
  app.use(`/${path}/playlists`, playlistRoute);
  app.use(`/${path}/accounts`, accountRouter);
};
export default routeAdmin;
