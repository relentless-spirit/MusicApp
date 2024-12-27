var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
export const generateTokenAndSetToken = (userId, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    res.cookie("jwt-token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development",
    });
});
