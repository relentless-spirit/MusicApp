import { Request, Response } from "express";
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
import Topic from "../../models/topic.model";

export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  });
  for (const song of songs) {
    const artist = await Artist.findOne({
      _id: song.artist,
      deleted: false,
      status: "active",
    });
    const topicInfo = await Topic.findOne({
      id: song.topic[0],
      deleted: false,
    });
  }
  res.render("admin/pages/music/index", {
    pageTitle: "Music page",
    songs: songs,
  });
};
export const create = async (req: Request, res: Response) => {
  const artists = await Artist.find({});
  const topics = await Topic.find({});
  res.render("admin/pages/music/create", {
    pageTitle: "Create Songs",
    artists,
    topics,
  });
};
export const createPost = async (req: Request, res: Response) => {
  try {
    const {
      title,
      topicId,
      singerId,
      lyrics,
      description,
      status,
      avatar,
      audio,
    } = req.body;
    const songInfo = {
      title,
      artist: singerId,
      topic: topicId,
      fileUrl: audio[0],
      coverImage: avatar[0],
      lyrics,
      description,
      status,
    };
    const newSong = new Song(songInfo);
    await newSong.save();
    res.redirect("/admin/songs");
  } catch (error) {
    console.log(error);
  }
};
