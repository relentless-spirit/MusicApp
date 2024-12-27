var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import FavoriteSong from "../../models/favorite_song.model";
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
export const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
        if (id) {
            const favoriteSongs = yield FavoriteSong.find({
                user_id: id,
                deleted: false,
            }).select("song_id");
            const songs = [];
            for (const favoriteSong of favoriteSongs) {
                const song = yield Song.findOne({
                    _id: favoriteSong.song_id,
                    deleted: false,
                });
                songs.push(song);
            }
            for (const song of songs) {
                const artist = yield Artist.findOne({
                    _id: song === null || song === void 0 ? void 0 : song.artist,
                    deleted: false,
                }).select("fullName");
                if (song) {
                    if (!artist) {
                        song.artist = "Artist information not found";
                    }
                    else {
                        song.artist = artist.fullName;
                    }
                }
            }
            const favoriteSongIds = favoriteSongs.map((item) => item.song_id.toString());
            res.render("client/pages/favorite-songs/index.pug", {
                songs: songs,
                favoriteSongIds: favoriteSongIds,
            });
        }
        else {
            res.redirect("/auth/login");
        }
    }
    catch (error) {
        console.log(error);
    }
});
export const addFavoriteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const userID = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
        if (userID) {
            const favoriteSong = yield FavoriteSong.findOne({ song_id: id });
            if (favoriteSong) {
                if (favoriteSong.deleted === true) {
                    yield FavoriteSong.updateOne({ song_id: id }, {
                        user_id: userID,
                        deleted: false,
                        removed_at: null,
                    });
                    res.json({ code: "success" });
                }
                else {
                    yield FavoriteSong.updateOne({ song_id: id }, {
                        deleted: true,
                        removed_at: new Date(),
                    });
                    res.json({ code: "remove" });
                }
            }
            else {
                const record = new FavoriteSong({
                    user_id: res.locals.user.id,
                    song_id: id,
                });
                yield record.save();
                res.json({ code: "success" });
            }
        }
        else {
            res.render("client/pages/auth/login.pug");
        }
    }
    catch (error) {
        console.log(error);
        res.json({ code: "error" });
    }
});
