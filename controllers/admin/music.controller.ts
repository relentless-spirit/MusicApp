import { Request, Response } from "express";
import Song from "../../models/song.model";
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({});
  res.render("admin/pages/music/index", {
    pageTitle: "Music page",
    songs: songs,
  });
};
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/music/create", {
    pageTitle: "Create page",
  });
};
