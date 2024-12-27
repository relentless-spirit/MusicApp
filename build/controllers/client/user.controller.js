var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
import User from "../../models/user.model";
export const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("Invalid user ID");
        }
        const objectId = new mongoose.Types.ObjectId(userId);
        const user = yield User.findOne({
            _id: objectId,
            deleted: false,
            status: "active",
        }).select("username avatar playlist follow_songs follow_artists");
        const songs = yield Song.find({ deleted: false, status: "active" });
        const artists = yield Artist.find({
            _id: {
                $in: user === null || user === void 0 ? void 0 : user.follow_artists
            },
            deleted: false,
            status: "active"
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        for (const song of songs) {
            const artist = yield Artist.findOne({
                _id: song === null || song === void 0 ? void 0 : song.artist,
                deleted: false
            }).select("fullName");
            if (!artist) {
                song.artist = "Không tìm thấy thông tin nghệ sĩ";
            }
            else {
                song.artist = artist.fullName;
            }
        }
        res.render("client/pages/users/index.pug", {
            userInfo: user,
            songs,
            artists,
        });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Internal Server Error");
    }
});
