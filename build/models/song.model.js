import mongoose from "mongoose";
const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, default: "" },
    topic: { type: Array, default: [] },
    fileUrl: { type: String, required: true },
    coverImage: { type: String },
    likes: { type: Array, default: [] },
    lyrics: { type: String, default: "" },
    description: { type: String, default: "" },
    status: { type: String, default: "active" },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Song = mongoose.model("Song", songSchema, "songs");
export default Song;
