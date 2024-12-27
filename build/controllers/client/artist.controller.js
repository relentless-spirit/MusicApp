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
import User from "../../models/user.model";
export const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const artist = yield Artist.findOne({
            _id: id,
            deleted: false
        });
        const followArtists = yield User.find({
            _id: res.locals.user.id,
            deleted: false
        }).select("follow_artists");
        const followArtistsIds = followArtists.map((item) => item.follow_artists.toString());
        res.render("client/pages/artists/index.pug", {
            artist: artist,
            followArtistsIds: followArtistsIds
        });
    }
    catch (error) {
        console.log(error);
    }
});
export const addFollowArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userID = res.locals.user.id;
        const user = yield User.findOne({
            _id: userID,
            deleted: false
        }).select("follow_artists");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let tempArray = user === null || user === void 0 ? void 0 : user.follow_artists;
        if (tempArray.includes(id)) {
            tempArray = tempArray.filter(item => item != id);
            res.json({ code: "remove" });
        }
        else {
            tempArray.push(id);
            res.json({ code: "add" });
        }
        user.follow_artists = tempArray;
        yield User.updateOne({
            _id: userID,
            deleted: false
        }, user);
    }
    catch (error) {
        console.log(error);
    }
});
