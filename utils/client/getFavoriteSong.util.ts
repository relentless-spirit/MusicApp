import FavoriteSong from "../../models/favorite_song.model";
export const getFavoriteSongOfUser = async (userID: String) => {
  const favoriteSongs = await FavoriteSong.find({
    user_id: userID,
    deleted: false,
  }).select("song_id");
  return favoriteSongs;
};
