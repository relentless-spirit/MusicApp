import mongoose from "mongoose";
const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    songs: [
        {
            type: String,
            default: [],
        },
    ],
    coverImage: { type: String, required: true },
    createdBy: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "active",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Playlist = mongoose.model("Playlist", playlistSchema, "playlists");
export default Playlist;
