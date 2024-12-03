import express from "express";
const router = express.Router();

import * as adminController from "../../controllers/admin/account.admin.controller";
import * as customerController from "../../controllers/admin/account.customer.controller";

//staff
router.get("/admin", adminController.index);

//customer
router.get("/customer", customerController.index);

export const accountRouter = router;