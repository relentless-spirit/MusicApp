import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/topic.controller";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";
import multer from "multer";

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.getCreateTopicPage);

router.post("/create",
    upload.single("imgTopic"),
    uploadSingle,
    controller.createTopic
);

router.get("/edit/:id", controller.getEditTopicPage);

router.patch("/edit/:id",
    upload.single("imgTopic"),
    uploadSingle,
    controller.editTopic);

router.delete("/delete/:id", controller.deleteTopic);
export const topicRoute = router;