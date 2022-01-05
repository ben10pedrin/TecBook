import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { register } from "../routes/register";
import { login } from "../routes/login";
import { createPost } from "../routes/createPost";
import { getAllPosts } from "../routes/getAllPosts";
import { getUser } from "../routes/getUser";
import { getPostsFromUser } from "../routes/getPostsFromUser";

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(express.json());

  app.post("/api/user", register);
  app.get("/api/user", login);
  app.get("/api/user/:id", getUser);
  app.post("/api/post", createPost);
  app.get("/api/posts", getAllPosts);
  app.get("/api/posts/:id", getPostsFromUser);

  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
};

main();
