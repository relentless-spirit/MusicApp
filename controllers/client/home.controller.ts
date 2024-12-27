import { Request, Response } from "express";
import Song from "../../models/song.model";
import FavoriteSong from "../../models/favorite_song.model";
import Playlist from "../../models/playlist.model";
import User from "../../models/user.model";
import Fuse from "fuse.js";
import getUserInfo from "../../utils/client/getUserInfo.util";
import { getFullArtists } from "../../utils/client/getArtist.util";
import {
  getFullPlaylists,
  getPlaylistOfUser,
} from "../../utils/client/getPlaylist.util";
import { getFullSongs } from "../../utils/client/getSong.util";
import { getFavoriteSongOfUser } from "../../utils/client/getFavoriteSong.util";
import { getFullTopics } from "../../utils/client/getTopic.util";

export const home = async (req: Request, res: Response) => {
  //finding logic
  const keyword = req.query.search as string;
  const userID = getUserInfo(req, res);
  if (keyword) {
    const songs = await Song.find({
      deleted: false,
      status: "active",
    }).select("_id title artist fileUrl coverImage");
    const fuse = new Fuse(songs, {
      keys: ["title"],
    });
    const result = fuse.search(keyword);

    const favoriteSongs = await getFavoriteSongOfUser(userID);
    const favoriteSongIds = favoriteSongs.map((item) =>
      item.song_id.toString()
    );
    //individual playlists
    let userIndividualPlaylists = null;
    if (res.locals.user) {
      userIndividualPlaylists = await Playlist.find({
        user_id: userID,
        deleted: false,
      });
      for (const playlist of userIndividualPlaylists) {
        const user = await User.findOne({
          _id: playlist.user_id,
          deleted: false,
        });
        if (user) {
          (playlist as any)["username"] = user.username;
        }
        // console.log(userIndividualPlaylists);
      }
    }
    //render
    res.render("client/pages/home/find.pug", {
      findingTitle: keyword,
      songs: result,
      favoriteSongIds: favoriteSongIds,
      individualPlaylists: userIndividualPlaylists,
    });
  }
  //end finding logic
  const artists = await getFullArtists();
  const songs = await getFullSongs();
  const playlists = await getFullPlaylists();
  //individual playlists
  let individualPlaylists = null;
  if (res.locals.user) {
    individualPlaylists = await getPlaylistOfUser(userID);
  }
  const favoriteSongs = await getFavoriteSongOfUser(userID);
  const favoriteIds = favoriteSongs.map((item) => item.song_id.toString());
  const topics = await getFullTopics();
  res.render("client/pages/home", {
    artists: artists,
    songs,
    favoriteSongIds: favoriteIds,
    playlists: playlists,
    topics: topics,
    individualPlaylists: individualPlaylists,
    user: res.locals.user,
  });
};

export const autocomplete = async (req: Request, res: Response) => {
  const keyword = req.query.q;
  const result = await Song.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
    status: "active",
    deleted: false,
  })
    .select("title")
    .limit(10);
  res.json(result);
};
