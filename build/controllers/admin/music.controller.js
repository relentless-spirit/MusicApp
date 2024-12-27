var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
import Topic from "../../models/topic.model";
export const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield Song.find({
        deleted: false,
    });
    for (const song of songs) {
        const artist = yield Artist.findOne({
            _id: song.artist,
            deleted: false,
            status: "active",
        });
        song["artist"] = (artist === null || artist === void 0 ? void 0 : artist.fullName) || "Unknown Artist";
        const topic = yield Topic.findOne({
            _id: song.topic[0],
        });
        song["topicTitle"] = topic ? topic.title : "Unknown Topic";
    }
    res.render("admin/pages/music/index", {
        pageTitle: "Music page",
        songs: songs,
    });
});
export const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield Artist.find({
        deleted: false,
    });
    const topics = yield Topic.find({ deleted: false });
    res.render("admin/pages/music/create", {
        pageTitle: "Create Songs",
        artists,
        topics,
    });
});
export const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { title, topicId, singerId, lyrics, description, status, avatar, audio, } = req.body;
        const songInfo = {
            title,
            artist: singerId,
            topic: topicId,
            fileUrl: audio[0],
            coverImage: avatar[0],
            lyrics,
            description,
            status,
        };
        const newSong = new Song(songInfo);
        yield newSong.save();
        req.flash("success", "Update song successfully");
        res.redirect("/admin/songs");
    }
    catch (error) {
        req.flash("error", "Update song failed");
        res.redirect("back");
    }
});
export const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const artists = yield Artist.find({
        deleted: false,
    });
    const topics = yield Topic.find({ deleted: false });
    const song = yield Song.findOne({
        _id: id,
        deleted: false,
        status: "active",
    });
    res.render("admin/pages/music/edit", {
        pageTitle: "Edit Songs",
        song,
        topics,
        artists,
    });
});
export const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Song.updateOne({
            _id: req.params.id,
        }, req.body);
        req.flash("success", "Update song successfully");
        res.redirect("/admin/songs");
    }
    catch (error) {
        req.flash("error", "Update song failed");
        res.redirect("back");
    }
});
export const deletePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Song.updateOne({
            _id: req.params.id,
        }, {
            deleted: true,
        });
        req.flash("success", "Delete song successfully");
        res.json({ success: true });
    }
    catch (error) {
        req.flash("error", "Delete song failed");
        res.json({ success: false, error: error.message });
    }
});
