import express, { Express, Request, Response } from "express";
import routeClient from "./routes/client/index.route";
import routeAdmin from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import dotenv from "dotenv";
dotenv.config();
// callGetArtistAlbum();
const app: Express = express();
const port = 3000;

app.set("views", "views");
app.set("view engine", "pug");

// Serve static files
app.use(express.static("public"));

import { connect } from "./config/database.config.js";
connect();

app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Register routes
routeClient(app);
routeAdmin(app);

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
