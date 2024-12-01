import { Request, Response } from "express";
import Artist from "../../models/artist.model";
export const home = async (req: Request, res: Response) => {
  const artists = await Artist.find({ status: "active", deleted: false });
  res.render("client/pages/home", { artists: artists });
};
