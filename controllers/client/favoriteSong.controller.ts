import { Request, response, Response } from "express";
import FavoriteSong from "../../models/favorite_song.model";

export const addFavoriteSong = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const favoriteSong = await FavoriteSong.findOne({ song_id: id });
        if (favoriteSong) {
            if (favoriteSong.deleted === true) {
                await FavoriteSong.updateOne({ song_id: id }, {
                    deleted: false,
                    removed_at: null
                });
                res.json({ code: "success" });
            } else {
                await FavoriteSong.updateOne({ song_id: id },
                    {
                        deleted: true,
                        removed_at: new Date()
                    });
                res.json({ code: "remove" });
            }
        } else {
            const record = new FavoriteSong({
                // user_id,
                song_id: id,
            });
            await record.save();
            res.json({ code: "success" });
        }
    } catch (error) {
        console.log(error)
        res.json({ code: "error" });
    }
}