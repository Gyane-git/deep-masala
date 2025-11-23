import mysql from "mysql2/promise";

// MySQL connection
async function db() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "deepmasala",
  });
}

export async function GET(req) {
  try {
    const connection = await db();
    const [rows] = await connection.execute(
      "SELECT id, name, slug, description, image, created_at, updated_at FROM categories ORDER BY id DESC"
    );
    return new Response(JSON.stringify({ success: true, categories: rows }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch categories", error: err.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const file = formData.get("image");

    let imagePath = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const pathModule = require("path");
      const fs = require("fs");
      const uploadDir = pathModule.join(process.cwd(), "public/upload/categories");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = Date.now() + "-" + file.name;
      const filePath = pathModule.join(uploadDir, fileName);
      await fs.promises.writeFile(filePath, buffer);
      imagePath = `/upload/categories/${fileName}`;
    }

    const connection = await db();
    await connection.execute(
      "INSERT INTO categories (name, slug, description, image) VALUES (?, ?, ?, ?)",
      [name, slug, description, imagePath]
    );

    return new Response(JSON.stringify({ success: true, message: "Category added successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: "Error adding category", error: err.message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ success: false, message: "Category ID is required" }), { status: 400 });
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const file = formData.get("image");

    let imagePath = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const pathModule = require("path");
      const fs = require("fs");
      const uploadDir = pathModule.join(process.cwd(), "public/upload/categories");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = Date.now() + "-" + file.name;
      const filePath = pathModule.join(uploadDir, fileName);
      await fs.promises.writeFile(filePath, buffer);
      imagePath = `/upload/categories/${fileName}`;
    }

    const connection = await db();

    if (imagePath) {
      await connection.execute(
        "UPDATE categories SET name=?, slug=?, description=?, image=?, updated_at=NOW() WHERE id=?",
        [name, slug, description, imagePath, id]
      );
    } else {
      await connection.execute(
        "UPDATE categories SET name=?, slug=?, description=?, updated_at=NOW() WHERE id=?",
        [name, slug, description, id]
      );
    }

    return new Response(JSON.stringify({ success: true, message: "Category updated successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: "Error updating category", error: err.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ success: false, message: "Category ID is required" }), { status: 400 });
    }

    const connection = await db();
    await connection.execute("DELETE FROM categories WHERE id=?", [id]);

    return new Response(JSON.stringify({ success: true, message: "Category deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: "Error deleting category", error: err.message }), { status: 500 });
  }
}
