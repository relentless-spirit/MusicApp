import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  playlist?: string[];
  follow_songs?: string[];
  follow_artists?: string[];
  deleted: boolean;
  status: string;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: { type: String, default: "" },
    playlist: {
      type: Array,
      default: [],
    },
    follow_songs: {
      type: Array,
      default: [],
    },
    follow_artists: {
      type: Array,
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema, "users");

export default User;
