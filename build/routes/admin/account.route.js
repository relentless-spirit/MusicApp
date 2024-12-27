import express from "express";
const router = express.Router();
import * as adminController from "../../controllers/admin/account.admin.controller";
import * as customerController from "../../controllers/admin/account.customer.controller";
router.get("/admin", adminController.index);
router.get("/customer", customerController.index);
export const accountRouter = router;
