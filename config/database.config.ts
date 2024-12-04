import mongoose from "mongoose";

export const connect = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in the environment variables");
    }
    await mongoose.connect(mongoUrl);
    console.log("Connected to database succesfully");
  } catch (error) {
    console.log("Connected to database failled");
    console.log(error);
  }
};
