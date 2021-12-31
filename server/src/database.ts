import mysql from "mysql2/promise";

export let db: mysql.Connection;

export const connectDb = async () => {
  db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "test",
  });
};
