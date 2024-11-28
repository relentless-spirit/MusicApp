import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/music.controller";

router.get("/", controller.index);
router.get("/create", controller.create);
export const musicRoute = router;
