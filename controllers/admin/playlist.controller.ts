import { Request, Response } from "express";
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
import Topic from "../../models/topic.model";
import Playlist from "../../models/playlist.model";
export const index = (req: Request, res: Response) => {
  res.render("admin/pages/playlists/index", {
    pageTitle: "Dashboard page",
  });
};
export const create = async (req: Request, res: Response) => {
  const artists = await Artist.find({
    deleted: false,
  });
  const topics = await Topic.find({ deleted: false });
  const availableSongs = await Song.find({
    deleted: false,
    status: "active",
  });
  res.render("admin/pages/playlists/create", {
    pageTitle: "Create Playlists",
    artists,
    topics,
    availableSongs,
  });
};
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description, avatar, createdBy, songs, status } = req.body;
    const playlistInfo = {
      title,
      description,
      songs: JSON.parse(songs),
      coverImage: avatar,
      createdBy,

      status,
    };
    const newPlaylist = new Playlist(playlistInfo);
    await newPlaylist.save();
    req.flash("success", "Update playlists successfully");
    res.redirect("/admin/playlists");
  } catch (error) {
    console.log(error);
    req.flash("error", "Update playlists failed");
    res.redirect("back");
  }
};
