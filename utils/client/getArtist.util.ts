import Artist from "../../models/artist.model";
export const getFullArtists = async () => {
  const artists = await Artist.find({ status: "active", deleted: false });
  return artists;
};
