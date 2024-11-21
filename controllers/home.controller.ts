import { Request, Response } from "express";
export const home = async (req: Request, res: Response) => {
  res.render("client/pages/home");
};
