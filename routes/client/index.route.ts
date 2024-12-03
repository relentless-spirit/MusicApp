import musicRoute from "./music.route.js";
import homeRoute from "./home.route.js";
import playlistRoute from "./playlist.route.js";
const routeClient = (app: any) => {
  app.use("/music", musicRoute);
  app.use("/", homeRoute);
  app.use("/playlist", playlistRoute);
};
export default routeClient;
