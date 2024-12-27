import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/home.controller.js";
router.get("/", controller.home);
router.get("/autocomplete", controller.autocomplete);
export default router;
