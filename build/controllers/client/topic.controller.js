var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Topic from "../../models/topic.model.js";
import Song from "../../models/song.model.js";
import Artist from "../../models/artist.model.js";
import FavoriteSong from "../../models/favorite_song.model.js";
import User from "../../models/user.model.js";
export const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const topic = yield Topic.findOne({
            _id: id,
            deleted: false
        });
        const songs = yield Song.find({
            topic: {
                $in: id
            },
            deleted: false
        });
        for (const song of songs) {
            const artist = yield Artist.findOne({
                _id: song.artist,
                deleted: false
            });
            if (!artist) {
                song.artist = "Không tìm thấy thông tin nghệ sĩ";
            }
            else {
                song["artistFullName"] = artist.fullName;
            }
        }
        let favoriteSongIds = null;
        let followSongIds = null;
        if (res.locals.user) {
            const favoriteSongs = yield FavoriteSong.find({
                user_id: res.locals.user.id,
                deleted: false
            }).select("song_id");
            favoriteSongIds = favoriteSongs.map(item => item.song_id.toString());
            const user = yield User.findOne({
                _id: res.locals.user.id,
                deleted: false
            }).select("follow_songs");
            const followSongIds = user === null || user === void 0 ? void 0 : user.follow_songs.map(item => item.toString());
        }
        res.render("client/pages/topics/index.pug", {
            topic: topic,
            songs: songs,
            favoriteSongIds: favoriteSongIds,
            followSongIds: followSongIds
        });
    }
    catch (error) {
        console.log(error);
    }
});
export const followTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userID = res.locals.user.id;
        const user = yield User.findOne({
            _id: userID,
            deleted: false
        }).select("follow_songs");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let tempArray = user.follow_songs;
        if (tempArray.includes(id)) {
            tempArray = tempArray.filter(playlistID => playlistID != id);
            res.json({ code: "remove" });
        }
        else {
            tempArray.push(id);
            res.json({ code: "success" });
        }
        user.follow_songs = tempArray;
        yield User.updateOne({
            _id: userID,
            deleted: false
        }, user);
    }
    catch (error) {
        console.log(error);
    }
});
