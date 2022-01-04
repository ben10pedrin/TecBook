import { Request, Response } from "express";
import { db } from "../src/database";
import * as yup from "yup";

const getPostsFromUserRequest = yup.object().shape({
  id: yup.number().integer().positive().required(),
});

export const getPostsFromUser = async (req: Request, res: Response) => {
  try {
    const { id } = await getPostsFromUserRequest.validate(req.params, {
      strict: false,
    });
    const [posts]: any = await db.execute(
      "select posts.id, posts.createdAt, posts.content, users.username from posts inner join users on posts.userId = users.id where users.id=?",
      [id]
    );
    if (posts.length === 0) {
      return res.status(500).send({ error: "no posts found" });
    }
    return res.send(posts);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(500).send({ error: error.message });
    } else {
      return res.status(500).send({ error: "unknown error" });
    }
  }
};
