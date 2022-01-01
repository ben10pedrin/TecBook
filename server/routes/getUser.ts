import { Request, Response } from "express";
import { db } from "../src/database";
import * as yup from "yup";

const getUserRequest = yup.object().shape({
  id: yup.number().integer().positive().required(),
});

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = await getUserRequest.validate(req.params, {
      strict: false,
    });
    const [rows]: any = await db.execute("select * from users where id=?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(500).send({ error: "user doesn't exists" });
    }
    return res.send(rows[0]);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(500).send({ error: error.message });
    } else {
      return res.status(500).send({ error: "unknown error" });
    }
  }
};
