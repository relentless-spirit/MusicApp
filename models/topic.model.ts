import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imgTopic: { type: String, required: true },
    content: { type: String, required: true },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", topicSchema, "topics");
export default Topic;
