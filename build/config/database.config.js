var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
export const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined in the environment variables");
        }
        yield mongoose.connect(mongoUrl);
        console.log("Connected to database succesfully");
    }
    catch (error) {
        console.log("Connected to database failled");
        console.log(error);
    }
});
