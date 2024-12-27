import express from "express";
import routeClient from "./routes/client/index.route.js";
import routeAdmin from "./routes/admin/index.route.js";
import { systemConfig } from "./config/system.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", "views");
app.set("view engine", "pug");
app.use(cookieParser("CODE"));
app.use(
  session({
    secret: "your-secret-key",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(methodOverride("_method"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
import { connect } from "./config/database.config.js";
connect();
app.locals.prefixAdmin = systemConfig.prefixAdmin;
routeAdmin(app);
routeClient(app);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
