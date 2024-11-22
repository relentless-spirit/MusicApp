import express, { Express, Request, Response } from "express";
import indexRoute from "./routes/index.route.js";
// import { callGetArtistAlbum } from "./services/spotifyAPI.service.js";
// callGetArtistAlbum();
const app: Express = express();
const port = 3000;

app.set("views", "views");
app.set("view engine", "pug");

// Serve static files
app.use(express.static("public"));

// Register routes
indexRoute(app);

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
