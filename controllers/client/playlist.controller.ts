import { Request, Response } from "express";
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
import Topic from "../../models/topic.model";
import Playlist from "../../models/playlist.model";
export const index = async (req: Request, res: Response) => {
  const playlist = await Playlist.findOne({
    _id: req.params.id,
    deleted: false,
    status: "active",
  });
  const songs = await Song.find({ status: "active", deleted: false });
  const songsInPlaylist = await Song.find({
    _id: {
      $in: playlist?.songs,
    },
  }).select("title fileUrl coverImage artist");
  for (const song of songsInPlaylist) {
    const artist = await Artist.findOne({
      _id: song.artist,
      status: "active",
      deleted: false,
    });
    song["artist"] = artist?.fullName || "Unknown Artist";
  }

  res.render("client/pages/playlist/detail.pug", {
    pageTitle: "Playlist pages",
    songsInPlaylist,
    playlist,
  });
};
