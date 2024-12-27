import { Request, Response } from "express";
const getUserInfo = (req: Request, res: Response) => {
  const userID = res.locals.user?.id || null;
  return userID;
};
export default getUserInfo;
