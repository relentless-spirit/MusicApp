import express from "express";
const router = express.Router();
import { home } from "../controllers/home.controller.js";
router.get("/", home);

export default router;
