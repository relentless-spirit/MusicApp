import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    songs: [
      {
        type: String,
        default: [],
      },
    ],
    user_id: { type: String, default: null },
    coverImage: { type: String, required: true },
    createdBy: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "public",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", playlistSchema, "playlists");
export default Playlist;
