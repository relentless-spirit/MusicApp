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
import Playlist from "../../models/playlist.model";
export const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlist = yield Playlist.findOne({
        _id: req.params.id,
        deleted: false,
        status: "active",
    });
    const songs = yield Song.find({ status: "active", deleted: false });
    const songsInPlaylist = yield Song.find({
        _id: {
            $in: playlist === null || playlist === void 0 ? void 0 : playlist.songs,
        },
    }).select("title fileUrl coverImage artist");
    for (const song of songsInPlaylist) {
        const artist = yield Artist.findOne({
            _id: song.artist,
            status: "active",
            deleted: false,
        });
        song["artist"] = (artist === null || artist === void 0 ? void 0 : artist.fullName) || "Unknown Artist";
    }
    res.render("client/pages/playlist/detail.pug", {
        pageTitle: "Playlist pages",
        songsInPlaylist,
        playlist,
    });
});
