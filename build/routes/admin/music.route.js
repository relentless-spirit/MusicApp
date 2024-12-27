import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/music.controller";
import { uploadFields } from "../../middlewares/admin/uploadCloud.middleware";
import multer from "multer";
const upload = multer();
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
]), uploadFields, controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
]), uploadFields, controller.editPatch);
router.patch("/delete/:id", controller.deletePatch);
export const musicRoute = router;
