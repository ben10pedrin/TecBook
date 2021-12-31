import { Request, Response } from "express";
import { db } from "../src/database";
import * as yup from "yup";

const getRequest = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = await getRequest.validate(req.body, {
      strict: true,
    });
    const [rows]: any = await db.execute(
      "select id from users where username=? and password=?",
      [username, password]
    );
    if (rows.length === 0) throw new Error("incorrect username or password");
    return res.send({ userId: rows[0].id });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(500).send({ error: error.message });
    } else {
      if (error.message.includes("incorrect")) {
        return res.status(500).send({ error: error.message });
      }
      return res.status(500).send({ error: "unknown error" });
    }
  }
};
