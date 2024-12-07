import { Request, Response } from "express";
import Artist from "../../models/artist.model";

export const index = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const artist = await Artist.findOne({
            _id: id,
            deleted: false
        });
        res.render("client/pages/artists/index.pug", {
            artist: artist
        });
    } catch (error) {
        console.log(error);
    }
}