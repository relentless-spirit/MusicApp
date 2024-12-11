import { Request, Response } from "express";
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
import Topic from "../../models/topic.model";
import Playlist from "../../models/playlist.model";
export const index = async (req: Request, res: Response) => {
  const playlist = await Playlist.findOne({
    _id: req.params.id,
    deleted: false,
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
    song["artist"] = artist?.fullName;
  }

  res.render("client/pages/playlist/detail.pug", {
    pageTitle: "Playlist pages",
    songsInPlaylist,
    playlist,
  });
};

export const createPlaylist = (req: Request, res: Response) => {
  try {
    req.body.user_id = res.locals.user.id;
    const record = new Playlist(req.body);
    record.save();
    res.json({
      code: "success",
      playlist: record,
    });
  } catch (error) {
    console.log(error);
  }
}

export const addPlaylist = async (req: Request, res: Response) => {
  try {
    const songID = req.body.song;
    const playlist = await Playlist.findOne({
      _id: req.body.playlist,
      deleted: false
    });
    let songs = playlist?.songs;
    if (songs?.includes(songID)) {
      songs = songs.filter(songs => songs != songID);
    } else {
      songs?.push(songID);
    }
    playlist["songs"] = songs;
    await Playlist.updateOne({
      _id: req.body.playlist,
      deleted: false
    }, playlist);
  } catch (error) {
    console.log(error);
  }
}