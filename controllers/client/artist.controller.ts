import { Request, Response } from "express";
import Artist from "../../models/artist.model";
import User from "../../models/user.model";

export const index = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const artist = await Artist.findOne({
            _id: id,
            deleted: false
        });
        let followArtistsIds = null
        if (res.locals.user) {
            const followArtists = await User.findOne({
                _id: res.locals.user.id,
                deleted: false
            }).select("follow_artists");
            followArtistsIds = followArtists.map((item) => item.follow_artists.toString());
        }
        res.render("client/pages/artists/index.pug", {
            artist: artist,
            followArtistsIds: followArtistsIds
        });
    } catch (error) {
        console.log(error);
    }
}

export const addFollowArtist = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userID = res.locals.user.id;
        const user = await User.findOne({
            _id: userID,
            deleted: false
        }).select("follow_artists");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let tempArray = user?.follow_artists;
        if (tempArray.includes(id)) {
            tempArray = tempArray.filter(item => item != id);
            res.json({ code: "remove" });
        } else {
            tempArray.push(id);
            res.json({ code: "add" });
        }
        user.follow_artists = tempArray;
        await User.updateOne({
            _id: userID,
            deleted: false
        }, user);
    } catch (error) {
        console.log(error);
    }
}