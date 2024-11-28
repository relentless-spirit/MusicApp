import { Request, Response } from "express";
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
import Topic from "../../models/topic.model";

export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({});
  res.render("admin/pages/music/index", {
    pageTitle: "Music page",
    songs: songs,
  });
};
export const create = async (req: Request, res: Response) => {
  const artists = await Artist.find({});
  const topics = await Topic.find({});
  res.render("admin/pages/music/create", {
    pageTitle: "Create page",
    artists,
    topics,
  });
};
