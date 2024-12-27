var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Song from "../../models/song.model.js";
import Artist from "../../models/artist.model.js";
import Topic from "../../models/topic.model.js";
import Playlist from "../../models/playlist.model.js";
export const index = (req, res) => {
    res.render("admin/pages/playlists/index", {
        pageTitle: "Dashboard page",
    });
};
export const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield Artist.find({
        deleted: false,
    });
    const topics = yield Topic.find({ deleted: false });
    const availableSongs = yield Song.find({
        deleted: false,
        status: "active",
    });
    res.render("admin/pages/playlists/create", {
        pageTitle: "Create Playlists",
        artists,
        topics,
        availableSongs,
    });
});
export const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, avatar, createdBy, songs, status } = req.body;
        const playlistInfo = {
            title,
            description,
            songs: JSON.parse(songs),
            coverImage: avatar,
            createdBy,
            status,
        };
        const newPlaylist = new Playlist(playlistInfo);
        yield newPlaylist.save();
        req.flash("success", "Update playlists successfully");
        res.redirect("/admin/playlists");
    }
    catch (error) {
        console.log(error);
        req.flash("error", "Update playlists failed");
        res.redirect("back");
    }
});
