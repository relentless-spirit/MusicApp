import musicRoute from "./music.route.js";
import homeRoute from "./home.route.js";
import playlistRoute from "./playlist.route.js";
import favoriteSongRoute from "./favoriteSong.route.js";
import authRoute from "./auth.route.js";
const routeClient = (app: any) => {
  app.use("/auth", authRoute);
  app.use("/music", musicRoute);
  app.use("/", homeRoute);
  app.use("/favorite-songs", favoriteSongRoute);
  app.use("/playlist", playlistRoute);
};
export default routeClient;
