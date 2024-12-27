var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Playlist from "../../models/playlist.model";
import User from "../../models/user.model";
export const getFullPlaylists = () => __awaiter(void 0, void 0, void 0, function* () {
    const playlists = yield Playlist.find({ status: "active", deleted: false });
    return playlists;
});
export const getPlaylistOfUser = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const playlists = yield Playlist.find({
        user_id: userID,
        deleted: false,
    });
    for (const playlist of playlists) {
        const user = yield User.findOne({
            _id: playlist.user_id,
            deleted: false,
        });
        if (user) {
            playlist["username"] = user.username;
        }
    }
    return playlists;
});
