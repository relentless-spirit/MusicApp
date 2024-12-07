import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/artist.controller";

router.get("/:id", controller.index);

export default router;