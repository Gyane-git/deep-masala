import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import mysql from "mysql2/promise";

// ===============================
// MySQL Connection
// ===============================
async function db() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "deepmasala", // your DB name
  });
}

// ===============================
// GET — Fetch all banners
// ===============================
export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.execute(
      "SELECT id, banner_name, image_path, created_at FROM banners ORDER BY id DESC"
    );

    return Response.json({ success: true, banners: rows });
  } catch (err) {
    return Response.json(
      { success: false, message: "Failed to fetch banners", error: err.message },
      { status: 500 }
    );
  }
}

// ===============================
// POST — Upload banner + Save DB
// ===============================
export async function POST(req) {
  try {
    const formData = await req.formData();
    const bannerName = formData.get("bannerName");
    const file = formData.get("bannerImage");

    if (!file) {
      return Response.json({ success: false, message: "No file uploaded!" });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // File storage folder
    const uploadDir = path.join(process.cwd(), "public/upload/banner");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Unique file name
    const fileName = Date.now() + "-" + file.name;
    const filePath = path.join(uploadDir, fileName);

    // Save file to public
    await writeFile(filePath, buffer);

    const imagePath = `/upload/banner/${fileName}`;

    // Save to MySQL
    const connection = await db();
    await connection.execute(
      "INSERT INTO banners (banner_name, image_path) VALUES (?, ?)",
      [bannerName, imagePath]
    );

    return Response.json({
      success: true,
      message: "Banner added successfully 🎉",
      imagePath,
    });
  } catch (err) {
    return Response.json(
      { success: false, message: "Error uploading or saving to database", error: err.message },
      { status: 500 }
    );
  }
}
