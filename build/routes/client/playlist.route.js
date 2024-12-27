import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/playlist.controller";
router.get("/", controller.index);
router.get("/:id", controller.index);
export default router;
