import { Request, Response } from "express";
import { Account } from "../../models/account.model";

export const index = async (req: Request, res: Response) => {
  try {
    const admins = await Account.find({
      role_id: { $ne: "CUSTOMER" },
      deleted: false,
    });
    console.log(admins);
    res.render("admin/pages/accounts/admin/index.pug", {
      pageTitle: "Trang danh sách tài khoản nhân viên",
      admins: admins,
    });
  } catch (error) {
    console.log(error);
  }
};
