import musicRoute from "./music.route.js";
import homeRoute from "./home.route.js";
const index = (app: any) => {
  app.use("/music", musicRoute);
  app.use("/", homeRoute);
};
export default index;
