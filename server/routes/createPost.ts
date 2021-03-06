import { Request, Response } from "express";
import { Post } from "../models/Post";
import * as yup from "yup";

const createPostRequest = yup.object().shape({
  userId: yup.number().integer().positive().required().strict(),
  content: yup.string().trim().max(255).required(),
});

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, content } = await createPostRequest.validate(req.body, {
      strict: false,
    });

    const post = new Post({ user: userId, content });
    await post.save();

    /* const [{ insertId }]: any = await db.execute(
      "insert into posts (userId, content) values (?, ?)",
      [userId, content]
    );
    const [[post]]: any = await db.execute(
      "select posts.id, posts.createdAt, posts.content, users.username from posts inner join users on posts.userId = users.id where posts.id=?",
      [insertId]
    ); */
    return res.send(post);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(500).send({ error: error.message });
    } else {
      console.log(error);
      return res.status(500).send({ error: "unknown error" });
    }
  }
};
