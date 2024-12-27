import express from "express";
const router = express.Router();
import { home } from "../../controllers/client/home.controller";
router.get("/", home);
export default router;
