import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";
export const authSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, rePassword } = req.body;
  if (!username || !email || !password) {
    res.redirect("back");
    return;
  }
  if (password.length < 6) {
    res.redirect("back");
    return;
  }
  if (password !== rePassword) {
    res.redirect("back");
    return;
  }
  const existingUserByEmail = await User.findOne({
    email: email,
    deleted: false,
    status: "active",
  });
  const existingUserByUsername = await User.findOne({
    username: username,
    deleted: false,
    status: "active",
  });
  if (existingUserByEmail) {
    res.redirect("back");
    return;
  }
  if (existingUserByUsername) {
    res.redirect("back");
    return;
  }
  next();
};
