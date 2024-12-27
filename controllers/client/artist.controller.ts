import { Request, Response } from "express";
import Artist from "../../models/artist.model";
import User from "../../models/user.model";
import Song from "../../models/song.model";
import { getFavoriteSongOfUser } from "../../utils/client/getFavoriteSong.util";
import getUserInfo from "../../utils/client/getUserInfo.util";
import { getPlaylistOfUser } from "../../utils/client/getPlaylist.util";
export const index = async (req: Request, res: Response) => {
  try {
    const userID = getUserInfo(req, res);
    let individualPlaylists = null;
    if (res.locals.user) {
      individualPlaylists = await getPlaylistOfUser(userID);
    }
    const id = req.params.id;
    const artist = await Artist.findOne({
      _id: id,
      deleted: false,
    });
    let followArtistsIds = null;
    if (res.locals.user) {
      const followArtists = await User.findOne({
        _id: res.locals.user.id,
        deleted: false,
      }).select("follow_artists");
      if (followArtists && followArtists.follow_artists) {
        followArtistsIds = followArtists.follow_artists.map((item) =>
          item.toString()
        );
      }
    }
    const songs = await Song.find({
      artist: id,
      deleted: false,
    });
    for (const song of songs) {
      if (artist?.fullName) {
        song.artist = artist.fullName;
      }
    }
    const favoriteSongs = await getFavoriteSongOfUser(userID);
    const favoriteSongIds = favoriteSongs.map((item) =>
      item.song_id.toString()
    );
    res.render("client/pages/artists/index.pug", {
      artist: artist,
      songs: songs,
      followArtistsIds: followArtistsIds,
      individualPlaylists: individualPlaylists,
      favoriteSongIds: favoriteSongIds,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addFollowArtist = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userID = res.locals.user.id;
    const user = await User.findOne({
      _id: userID,
      deleted: false,
    }).select("follow_artists");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let tempArray = user?.follow_artists || [];
    if (tempArray.includes(id)) {
      tempArray = tempArray.filter((item) => item != id);
      res.json({ code: "remove" });
    } else {
      tempArray.push(id);
      res.json({ code: "add" });
    }
    user.follow_artists = tempArray;
    await User.updateOne(
      {
        _id: userID,
        deleted: false,
      },
      user
    );
  } catch (error) {
    console.log(error);
  }
};
