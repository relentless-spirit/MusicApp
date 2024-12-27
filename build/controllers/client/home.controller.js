var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Artist from "../../models/artist.model";
import Song from "../../models/song.model";
import FavoriteSong from "../../models/favorite_song.model";
import Playlist from "../../models/playlist.model";
import Topic from "../../models/topic.model";
export const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const keyword = req.query.search;
    const userID = ((_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id) || null;
    if (keyword) {
        const songs = yield Song.find({
            title: {
                $regex: new RegExp(keyword, "i"),
            },
            deleted: false,
            status: "active",
        });
        const favoriteSongs = yield FavoriteSong.find({
            user_id: userID,
            deleted: false,
        }).select("song_id");
        const favoriteSongIds = favoriteSongs.map((item) => item.song_id.toString());
        res.render("client/pages/home/find.pug", {
            findingTitle: keyword,
            songs,
            favoriteSongIds: favoriteSongIds,
        });
    }
    const artists = yield Artist.find({ status: "active", deleted: false });
    const songs = yield Song.find({ status: "active", deleted: false });
    const playlists = yield Playlist.find({ status: "active", deleted: false });
    for (const song of songs) {
        const artist = yield Artist.findOne({
            _id: song.artist,
            status: "active",
            deleted: false,
        });
        song.artistFullName =
            (artist === null || artist === void 0 ? void 0 : artist.fullName) || "Unknown Artist";
    }
    const favoriteSongs = yield FavoriteSong.find({
        user_id: userID,
        deleted: false,
    }).select("song_id");
    const favoriteIds = favoriteSongs.map((item) => item.song_id.toString());
    const topics = yield Topic.find({
        deleted: false,
    });
    res.render("client/pages/home", {
        artists: artists,
        songs,
        favoriteSongIds: favoriteIds,
        playlists: playlists,
        topics: topics,
    });
});
