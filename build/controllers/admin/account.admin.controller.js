var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Account from "../../models/account.model.js";
export const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield Account.find({
            role_id: { $ne: "CUSTOMER" },
            deleted: false
        });
        console.log(admins);
        res.render("admin/pages/accounts/admin/index.pug", {
            pageTitle: "Trang danh sách tài khoản nhân viên",
            admins: admins
        });
    }
    catch (error) {
        console.log(error);
    }
});
