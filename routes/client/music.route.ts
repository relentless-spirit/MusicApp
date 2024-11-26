import express from "express";
const router = express.Router();
import { music } from "../../controllers/client/music.controller";
router.get("/", music);

export default router;
