var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { streamUpload } from "../../helpers/cloudinary.helper";
export const uploadSingle = (req, res, next) => {
    if (req["file"]) {
        function upload(req) {
            return __awaiter(this, void 0, void 0, function* () {
                let result = yield streamUpload(req["file"].buffer);
                req.body[req["file"].fieldname] = result["url"];
                next();
            });
        }
        upload(req);
    }
    else {
        next();
    }
};
export const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    for (const key in req["files"]) {
        req.body[key] = [];
        const array = req["files"][key];
        for (const item of array) {
            try {
                const result = yield streamUpload(item.buffer);
                req.body[key].push(result["url"]);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    next();
});
