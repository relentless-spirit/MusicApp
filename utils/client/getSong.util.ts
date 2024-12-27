import Song from "../../models/song.model";
import Artist from "../../models/artist.model";
export const getFullSongs = async () => {
  const songs = await Song.find({ status: "active", deleted: false });
  for (const song of songs) {
    const artist = await Artist.findOne({
      _id: song.artist,
      status: "active",
      deleted: false,
    });
    (song as any)["artistFullName"] = artist?.fullName || "Unknown Artist";
  }
  return songs;
};
