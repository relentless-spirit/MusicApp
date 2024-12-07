import { Request, Response } from "express";
import Artist from "../../models/artist.model";
import Song from "../../models/song.model";
import FavoriteSong from "../../models/favorite_song.model";
import Playlist from "../../models/playlist.model";
import Topic from "../../models/topic.model";
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
    song["artistFullName"] = artist?.fullName;
  }
  const favoriteSongs = await FavoriteSong.find({
    deleted: false,
  }).select("song_id");
  const favoriteIds = favoriteSongs.map(item => item.song_id.toString());
  const topics = await Topic.find({
    deleted: false
  })
  res.render("client/pages/home", {
    artists: artists, songs,
    favoriteSongIds: favoriteIds,
    playlists: playlists,
    topics: topics
  });
};
