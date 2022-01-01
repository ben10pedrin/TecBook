import express from "express";
import { register } from "../routes/register";
import { login } from "../routes/login";
import { createPost } from "../routes/createPost";
import { getAllPosts } from "../routes/getAllPosts";
import { getUser } from "../routes/getUser";
import { getPostsFromUser } from "../routes/getPostsFromUser";
import { connectDb } from "./database";

const main = async () => {
  await connectDb();

  const app = express();
  const PORT = process.env.PORT || 4000;

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
