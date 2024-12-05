import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
import FavoriteSong from "../../models/favorite_song.model";

export const index = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;   // sẽ thay chỗ này bằng topic_slug
        const topic = await Topic.findOne({
            _id: id,
            deleted: false
        });

        const songs = await Song.find({
            topic: {
                $in: id
            },
            deleted: false
        });
        //thêm phân trang và giới hạn số bài hát ở đây
        for (const song of songs) {
            const artist = await Artist.findOne({
                _id: song.artist,
                deleted: false
            });

            if (!artist) {
                song.artist = "Không tìm thấy thông tin nghệ sĩ";
            }
            else {
                song.artist = artist.fullName;
            }
        }
        const favoriteSongs = await FavoriteSong.find({
            user_id: res.locals.user.id,
            deleted: false
        }).select("song_id");
        const favoriteSongIds = favoriteSongs.map(item => item.song_id.toString());
        res.render("client/pages/topics/index.pug", {
            topic: topic,
            songs: songs,
            favoriteSongIds: favoriteSongIds
        });
    } catch (error) {
        console.log(error);
    }
}