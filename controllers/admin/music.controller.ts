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
    song["artist"] = artist?.fullName;
    // console.log(song.topic);
    const topic = await Topic.findOne({
      _id: song.topic[0],
    });
    song["topic"] = topic.title;
  }
  res.render("admin/pages/music/index", {
    pageTitle: "Music page",
    songs: songs,
  });
};
export const create = async (req: Request, res: Response) => {
  const artists = await Artist.find({
    deleted: false,
  });
  const topics = await Topic.find({ deleted: false });
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
    req.flash("success", "Update song successfully");
    res.redirect("/admin/songs");
  } catch (error) {
    req.flash("error", "Update song failed");
    res.redirect("back");
  }
};
export const edit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const artists = await Artist.find({
    deleted: false,
  });
  const topics = await Topic.find({ deleted: false });
  const song = await Song.findOne({
    _id: id,
    deleted: false,
    status: "active",
  });

  res.render("admin/pages/music/edit", {
    pageTitle: "Edit Songs",
    song,
    topics,
    artists,
  });
};
export const editPatch = async (req: Request, res: Response) => {
  try {
    await Song.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    req.flash("success", "Update song successfully");
    res.redirect("/admin/songs");
  } catch (error) {
    req.flash("error", "Update song failed");
    res.redirect("back");
  }
};
export const deletePatch = async (req: Request, res: Response) => {
  try {
    await Song.updateOne(
      {
        _id: req.params.id,
      },
      {
        deleted: true,
      }
    );
    req.flash("success", "Delete song successfully");
    res.json({ success: true });
  } catch (error) {
    req.flash("error", "Delete song failed");
    res.json({ sucess: false, error: error.message });
  }
};
