import mysql from "mysql2/promise";

async function db() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "deepmasala",
  });
}

export async function GET(req, context) {
  try {
    const params = await context.params; // ✅ FIX
    const code = params.code?.trim();     // ✅ NOW SAFE

    if (!code) {
      return new Response(
        JSON.stringify({ success: false, message: "Product code missing" }),
        { status: 400 }
      );
    }

    const connection = await db();

    const [rows] = await connection.execute(
      "SELECT * FROM products WHERE product_code = ? LIMIT 1",
      [code]
    );

    await connection.end();

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Product not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, product: rows[0] }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
