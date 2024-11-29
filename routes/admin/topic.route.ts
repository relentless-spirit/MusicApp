import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/topic.controller";

router.get("/", controller.index);

export const topicRoute = router;