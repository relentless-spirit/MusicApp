import musicRoute from "./music.route.js";
import homeRoute from "./home.route.js";
import favoriteSongRoute from "./favoriteSong.route.js";
const routeClient = (app: any) => {
  app.use("/music", musicRoute);
  app.use("/", homeRoute);
  app.use("/favorite-songs", favoriteSongRoute);
};
export default routeClient;
