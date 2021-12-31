import { Request, Response } from "express";
import * as yup from "yup";
import { db } from "../src/database";

const postRequest = yup.object().shape({
  username: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]*$/,
      "username must contain only alphanumeric characters or underscore"
    )
    .min(3)
    .max(16)
    .required(),
  password: yup.string().min(3).max(16).required(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "passwords do not match")
    .required(),
});

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = await postRequest.validate(req.body, {
      strict: true,
    });
    await db.execute("insert into users (username, password) values (?, ?)", [
      username,
      password,
    ]);
    const [rows]: any = await db.execute(
      "select id from users where username=?",
      [username]
    );

    return res.send({ userId: rows[0].id });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(500).send({ error: error.message });
    } else {
      if (error.errno === 1062) {
        return res.status(500).send({ error: "username already exists" });
      }
      return res.status(500).send({ error: "unknown error" });
    }
  }
};
