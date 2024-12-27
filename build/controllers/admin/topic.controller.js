var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/system";
export const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield Topic.find({
            deleted: false
        });
        res.render("admin/pages/topics/index.pug", {
            pageTitle: "Trang danh sách chủ đề",
            topics: topics
        });
    }
    catch (error) {
        console.log(error);
    }
});
export const getCreateTopicPage = (req, res) => {
    try {
        res.render("admin/pages/topics/create.pug");
    }
    catch (error) {
        console.log(error);
    }
};
export const createTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const topicRecord = new Topic(req.body);
        topicRecord.save();
        res.redirect(`/${systemConfig.prefixAdmin}/topics`);
        req.flash("success", "Tạo mới chủ đề bài hát thành công!");
    }
    catch (error) {
        console.log(error);
        res.redirect("back");
        req.flash("error", "Tạo mới chủ đề bài hát thất bại!");
    }
});
export const getEditTopicPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const topic = yield Topic.findOne({
            _id: id,
            deleted: false
        });
        res.render("admin/pages/topics/edit", {
            pageTitle: "Tranh chỉnh sửa chủ đề",
            topic: topic
        });
    }
    catch (error) {
        console.log(error);
    }
});
export const editTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield Topic.updateOne({
            _id: id,
            deleted: false
        }, req.body);
        res.redirect(`/${systemConfig.prefixAdmin}/topics`);
        req.flash("success", "Cập nhật chủ đề bài hát thành công!");
    }
    catch (error) {
        console.log(error);
        res.redirect("back");
        req.flash("error", "Cập nhật chủ đề bài hát thất bại!");
    }
});
export const deleteTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield Topic.updateOne({
            _id: id,
            deleted: false
        }, {
            deleted: true
        });
        req.flash("success", "Xóa chủ đề bài hát thành công!");
        res.json({ code: "success", });
    }
    catch (error) {
        console.log(error);
        req.flash("error", "Xóa chủ đề bài hát thất bại!");
        res.json({ code: "error", });
    }
});
