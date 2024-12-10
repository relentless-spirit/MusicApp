import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/artist.controller";

router.get("/:id", controller.index);

router.patch("/:id", controller.addFollowArtist);

export default router;