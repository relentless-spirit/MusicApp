import Playlist from "../../models/playlist.model";
import User from "../../models/user.model";
export const getFullPlaylists = async () => {
  const playlists = await Playlist.find({ status: "active", deleted: false });
  return playlists;
};
export const getPlaylistOfUser = async (userID: string) => {
  const playlists = await Playlist.find({
    user_id: userID,
    deleted: false,
  });
  for (const playlist of playlists) {
    const user = await User.findOne({
      _id: playlist.user_id,
      deleted: false,
    });
    if (user) {
      (playlist as any)["username"] = user.username;
    }
    // console.log(individualPlaylists);
  }
  return playlists;
};
