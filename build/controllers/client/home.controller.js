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
import Playlist from "../../models/playlist.model";
import User from "../../models/user.model";
import Fuse from "fuse.js";
import getUserInfo from "../../utils/client/getUserInfo.util";
import { getFullArtists } from "../../utils/client/getArtist.util";
import { getFullPlaylists, getPlaylistOfUser, } from "../../utils/client/getPlaylist.util";
import { getFullSongs } from "../../utils/client/getSong.util";
import { getFavoriteSongOfUser } from "../../utils/client/getFavoriteSong.util";
import { getFullTopics } from "../../utils/client/getTopic.util";
export const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.search;
    const userID = getUserInfo(req, res);
    if (keyword) {
        const songs = yield Song.find({
            deleted: false,
            status: "active",
        }).select("_id title artist fileUrl coverImage");
        const fuse = new Fuse(songs, {
            keys: ["title"],
        });
        const result = fuse.search(keyword);
        const favoriteSongs = yield getFavoriteSongOfUser(userID);
        const favoriteSongIds = favoriteSongs.map((item) => item.song_id.toString());
        let userIndividualPlaylists = null;
        if (res.locals.user) {
            userIndividualPlaylists = yield Playlist.find({
                user_id: userID,
                deleted: false,
            });
            for (const playlist of userIndividualPlaylists) {
                const user = yield User.findOne({
                    _id: playlist.user_id,
                    deleted: false,
                });
                if (user) {
                    playlist["username"] = user.username;
                }
            }
        }
        res.render("client/pages/home/find.pug", {
            findingTitle: keyword,
            songs: result,
            favoriteSongIds: favoriteSongIds,
            individualPlaylists: userIndividualPlaylists,
        });
    }
    const artists = yield getFullArtists();
    const songs = yield getFullSongs();
    const playlists = yield getFullPlaylists();
    let individualPlaylists = null;
    if (res.locals.user) {
        individualPlaylists = yield getPlaylistOfUser(userID);
    }
    const favoriteSongs = yield getFavoriteSongOfUser(userID);
    const favoriteIds = favoriteSongs.map((item) => item.song_id.toString());
    const topics = yield getFullTopics();
    res.render("client/pages/home", {
        artists: artists,
        songs,
        favoriteSongIds: favoriteIds,
        playlists: playlists,
        topics: topics,
        individualPlaylists: individualPlaylists,
        user: res.locals.user,
    });
});
export const autocomplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.q;
    const result = yield Song.find({
        title: {
            $regex: keyword,
            $options: "i",
        },
        status: "active",
        deleted: false,
    })
        .select("title")
        .limit(10);
    res.json(result);
});
