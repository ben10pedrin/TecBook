import express from "express";
import { register } from "../routes/register";
import { login } from "../routes/login";
import { connectDb } from "./database";

const main = async () => {
  await connectDb();

  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(express.json());

  app.post("/api/user", register);
  app.get("/api/user", login);

  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
};

main();
