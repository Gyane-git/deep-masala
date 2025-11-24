import mysql from "mysql2/promise";

// Named export (so you can `import { db } from ...`)
export async function db() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "deepmasala",
  });
}
