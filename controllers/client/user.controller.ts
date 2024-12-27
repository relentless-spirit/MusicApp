import { Request, Response } from "express";
import mongoose from "mongoose";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
import User from "../../models/user.model";
import { getPlaylistOfUser } from "../../utils/client/getPlaylist.util";
import { getFavoriteSongOfUser } from "../../utils/client/getFavoriteSong.util";

export const index = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    let individualPlaylists = null;
    if (res.locals.user) {
      individualPlaylists = await getPlaylistOfUser(userId);
    }
    const favoriteSongs = await getFavoriteSongOfUser(userId);
    const favoriteSongIds = favoriteSongs.map((item) =>
      item.song_id.toString()
    );
    // Validate the userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID");
    }
    // Convert the userId to an ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);
    const user = await User.findOne({
      _id: objectId,
      deleted: false,
      status: "active",
    }).select("username avatar playlist follow_songs follow_artists");
    const songs = await Song.find({ deleted: false, status: "active" });
    const artists = await Artist.find({
      _id: {
        $in: user?.follow_artists,
      },
      deleted: false,
      status: "active",
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    for (const song of songs) {
      const artist = await Artist.findOne({
        _id: song?.artist,
        deleted: false,
      }).select("fullName");
      if (!artist) {
        song.artist = "Không tìm thấy thông tin nghệ sĩ";
      } else {
        song.artist = artist.fullName;
      }
    }
    res.render("client/pages/users/index.pug", {
      userInfo: user,
      songs,
      artists,
      individualPlaylists,
      favoriteSongIds,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
};
