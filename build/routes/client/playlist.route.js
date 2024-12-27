import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/playlist.controller.js";
router.get("/", controller.index);
router.get("/:id", controller.index);
router.post("/create-playlist", controller.createPlaylist);
router.patch("/add-playlist", controller.addPlaylist);
export default router;
