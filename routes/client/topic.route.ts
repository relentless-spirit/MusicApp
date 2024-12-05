import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/topic.controller";

router.get("/:id", controller.index);

export default router;