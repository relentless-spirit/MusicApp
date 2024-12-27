var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../../models/user.model";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetToken } from "../../helpers/JWT.helper";
export function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("client/pages/auth/login.pug");
    });
}
export function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("client/pages/auth/sign-up.pug");
    });
}
export function loginPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.redirect("back");
                return;
            }
            const user = yield User.findOne({
                username: username,
                deleted: false,
                status: "active",
            });
            if (!user) {
                res.redirect("back");
                return;
            }
            const isPasswordMatch = yield bcryptjs.compare(password, user.password);
            if (!isPasswordMatch) {
                res.redirect("back");
                return;
            }
            generateTokenAndSetToken(user._id.toString(), res);
            res.redirect("/");
        }
        catch (error) {
            res.status(400).json({
                code: 400,
                message: "Internal server error",
            });
        }
    });
}
export function signupPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password, rePassword } = req.body;
            const salt = bcryptjs.genSaltSync(10);
            const hashedPassword = yield bcryptjs.hash(password, salt);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });
            if (newUser) {
                generateTokenAndSetToken(newUser._id.toString(), res);
                yield newUser.save();
            }
            else {
                res.redirect("back");
                return;
            }
            res.redirect("/auth/login");
        }
        catch (error) {
            console.error(error);
        }
    });
}
export function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie("jwt-token");
            res.locals.user = null;
            res.status(200).json({
                code: 200,
                message: "Logout successfully",
            });
        }
        catch (error) {
            res.status(400).json({ code: 400, message: "Internal server error" });
        }
    });
}
