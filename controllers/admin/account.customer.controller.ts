import { Request, Response } from "express";
import Account from "../../models/account.model";

export const index = async (req: Request, res: Response) => {
    try {
        const customers = await Account.find({
            role_id: { $eq: "CUSTOMER" },
            deleted: false
        });
        res.render("admin/pages/accounts/customer/index.pug", {
            pageTitle: "Trang danh sách tài khoản khách hàng",
            customers: customers
        })
    } catch (error) {
        console.log(error);
    }
}