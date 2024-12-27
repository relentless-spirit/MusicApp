import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/user.controller.js";
router.get("/profile/:userId", controller.index);
export default router;
