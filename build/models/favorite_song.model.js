import mongoose from "mongoose";
const favoriteSongSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    song_id: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    removed_at: { type: Date, default: null },
}, { timestamps: true });
favoriteSongSchema.index({ removed_at: 1 }, { expireAfterSeconds: 2592000 });
const FavoriteSong = mongoose.model("FavoriteSong", favoriteSongSchema, "favoriteSongs");
export default FavoriteSong;
