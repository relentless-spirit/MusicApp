import { Request, Response } from "express";
import Artist from "../../models/artist.model";
import Song from "../../models/song.model";
import Playlist from "../../models/playlist.model";
export const home = async (req: Request, res: Response) => {
  const artists = await Artist.find({ status: "active", deleted: false });
  const songs = await Song.find({ status: "active", deleted: false });
  const playlists = await Playlist.find({ status: "active", deleted: false });
  for (const song of songs) {
    const artist = await Artist.findOne({
      _id: song.artist,
      status: "active",
      deleted: false,
    });
    song["artist"] = artist?.fullName;
  }
  res.render("client/pages/home", { artists: artists, songs, playlists });
};
