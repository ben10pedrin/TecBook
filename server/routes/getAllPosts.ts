import { Request, Response } from "express";
import { db } from "../src/database";

export const getAllPosts = async (_: Request, res: Response) => {
  try {
    const [posts]: any = await db.execute(
      "select posts.id, posts.createdAt, posts.content, users.username from posts inner join users on posts.userId = users.id"
    );
    return res.send(posts);
  } catch (error) {
    return res.status(500).send({ error: "unknown error" });
  }
};
