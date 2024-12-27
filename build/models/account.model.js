import mongoose from "mongoose";
const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    phone: String,
    avatar: String,
    role_id: String,
    favorite_song: Array,
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
}, {
    timestamps: true
});
const Account = mongoose.model("Account", accountSchema, "accounts");
module.exports = Account;
