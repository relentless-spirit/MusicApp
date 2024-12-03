import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/playlist.controller";
import {
  uploadFields,
  uploadSingle,
} from "../../middlewares/admin/uploadCloud.middleware";
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
// router.get("/edit/:id", controller.edit);
// router.patch(
//   "/edit/:id",
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "audio", maxCount: 1 },
//   ]),
//   uploadFields,
//   controller.editPatch
// );
// router.patch("/delete/:id", controller.deletePatch);

export const playlistRoute = router;
