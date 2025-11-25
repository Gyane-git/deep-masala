import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

/**
 * Note: you may replace this db() with an env-driven connection pool.
 * This matches the function you provided.
 */
async function db() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "deepmasala",
  });
}

function sanitizeFilename(name) {
  return name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "");
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Read text fields
    const productCode = formData.get("productCode") || null;
    const productName = formData.get("productName") || null;
    const category = formData.get("category") || null; // id
    const brand = formData.get("brand") || null;
    const deliveryTargetDays = formData.get("deliveryTargetDays") || null;

    // boolean flags: may come as "on"/"true" or actual booleans; handle both
    const weeklyProduct = formData.get("weeklyProduct") ? 1 : 0;
    const flashSaleProduct = formData.get("flashSaleProduct") ? 1 : 0;
    const todayDeals = formData.get("todayDeals") ? 1 : 0;
    const specialProduct = formData.get("specialProduct") ? 1 : 0;

    const actualPrice = formData.get("actualPrice") || null;
    const sellingPrice = formData.get("sellingPrice") || null;
    const availableQuantity = formData.get("availableQuantity") || null;
    const stockQuantity = formData.get("stockQuantity") || null;

    const productDescription = formData.get("productDescription") || null;
    const keySpecifications = formData.get("keySpecifications") || null;
    const packaging = formData.get("packaging") || null;
    const warranty = formData.get("warranty") || null;

    // File fields
    const productCatalogFile = formData.get("productCatalog");
    const mainImageFile = formData.get("mainImage");

    // Prepare directories
    const productsDir = path.join(process.cwd(), "public/upload/products");
    const catalogsDir = path.join(process.cwd(), "public/upload/catalogs");

    if (!fs.existsSync(productsDir)) {
      fs.mkdirSync(productsDir, { recursive: true });
    }
    if (!fs.existsSync(catalogsDir)) {
      fs.mkdirSync(catalogsDir, { recursive: true });
    }

    // Helper to save file and return public path
    const saveFile = async (file, destDir) => {
      if (!file || typeof file === "string") return null;
      const filenameRaw = file.name || `file-${Date.now()}`;
      const safeName = Date.now() + "-" + sanitizeFilename(filenameRaw);
      const filePath = path.join(destDir, safeName);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(filePath, buffer);
      // return path usable in <img src="..."> or storing in DB
      return `/upload/${path.basename(destDir)}/${safeName}`;
    };

    // Save files (if present)
    let productCatalogPath = null;
    let mainImagePath = null;

    if (productCatalogFile && productCatalogFile.size) {
      // Optionally validate type/size here
      productCatalogPath = await saveFile(productCatalogFile, catalogsDir);
    }

    if (mainImageFile && mainImageFile.size) {
      // Optionally validate type/size here
      mainImagePath = await saveFile(mainImageFile, productsDir);
    }

    // Insert into DB
    const connection = await db();

    const insertSQL = `
      INSERT INTO products
      (product_code, product_name, category_id, brand, delivery_target_days,
       weekly_product, flash_sale_product, today_deals, special_product,
       actual_price, selling_price, available_quantity, stock_quantity,
       product_description, key_specifications, packaging, warranty,
       product_catalog, main_image)
      VALUES (?, ?, ?, ?, ?,
              ?, ?, ?, ?,
              ?, ?, ?, ?,
              ?, ?, ?, ?,
              ?, ?)
    `;

    const params = [
      productCode,
      productName,
      category|| null,
      brand,
      deliveryTargetDays || null,
      weeklyProduct,
      flashSaleProduct,
      todayDeals,
      specialProduct,
      actualPrice || null,
      sellingPrice || null,
      availableQuantity || null,
      stockQuantity || null,
      productDescription,
      keySpecifications,
      packaging,
      warranty,
      productCatalogPath,
      mainImagePath,
    ];

    const [result] = await connection.execute(insertSQL, params);

    // optional: you may want to close connection: connection.end()
    await connection.end();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product saved successfully",
        productId: result.insertId,
        mainImage: mainImagePath,
        productCatalog: productCatalogPath,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("POST /api/products error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error", error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
