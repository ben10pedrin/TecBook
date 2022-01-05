import mongoose from "mongoose";

interface Post extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  createdAt?: number;
  content: string;
}

export const Post = mongoose.model<Post>(
  "Post",
  new mongoose.Schema<Post>({
    user: { type: mongoose.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    content: { type: String, required: true },
  })
);
