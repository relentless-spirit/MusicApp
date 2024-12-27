import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/playlist.controller.js";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware.js";
import multer from "multer";
const upload = multer();
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadSingle,
  controller.createPost
);
export const playlistRoute = router;
