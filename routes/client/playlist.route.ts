import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/playlist.controller";
import multer from "multer";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer();

router.get("/", controller.index);
router.get("/:id", controller.index);
router.post("/create-playlist", controller.createPlaylist);
router.patch("/add-playlist", controller.addPlaylist);
router.patch(
    "/save-playlist/:id",
    upload.single("coverImage"),
    uploadSingle,
    controller.savePlaylist);
export default router;
