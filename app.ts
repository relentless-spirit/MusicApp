import express, { Express, Request, Response } from "express";
import indexRoute from "./routes/index.route.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT;
app.set("views", `/views`);
app.set("view engine", "pug");

app.use(express.static(`/public`));
indexRoute(app);

app.listen(port, () => {
  console.log("The server is listening " + port);
});
