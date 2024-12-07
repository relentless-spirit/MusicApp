import { Request, Response } from "express";
import mongoose from "mongoose";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
import User from "../../models/user.model";

export const index = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    // Validate the userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID");
    }
    // Convert the userId to an ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);
    const user = await User.findOne({
      _id: objectId,
      deleted: false,
      status: "active",
    }).select("username avatar playlist follow_songs");
    const songs = await Song.find({ deleted: false, status: "active" });
    const artists = await Artist.find({ deleted: false, status: "active" });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("client/pages/users/index.pug", {
      userInfo: user,
      songs,
      artists,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
};
