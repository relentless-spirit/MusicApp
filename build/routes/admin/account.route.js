import express from "express";
const router = express.Router();
import * as adminController from "../../controllers/admin/account.admin.controller.js";
import * as customerController from "../../controllers/admin/account.customer.controller.js";
router.get("/admin", adminController.index);
router.get("/customer", customerController.index);
export const accountRouter = router;
