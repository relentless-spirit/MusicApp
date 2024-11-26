import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database succesfully");
    } catch (error) {
        console.log("Connected to database failled");
        console.log(error);
    }
}