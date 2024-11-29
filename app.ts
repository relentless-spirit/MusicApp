import express, { Express, Request, Response } from "express";
import routeClient from "./routes/client/index.route";
import routeAdmin from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
dotenv.config();
const app: Express = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", "views");
app.set("view engine", "pug");

app.use(cookieParser("CODE"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.use(methodOverride("_method"));

// Serve static files
app.use(express.static("public"));

import { connect } from "./config/database.config.js";
connect();

app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Register routes
routeAdmin(app);
routeClient(app);

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
