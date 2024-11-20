import express from "express";
const router = express.Router();
import { music } from "../controllers/music.controller.js";
router.get("/", music);

export default router;
