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
    const categories = formData.get("categories") || null; // id
    const category_id = formData.get("category_id") || null;
    const brand = formData.get("brand") || null;
    const deliveryTargetDays = formData.get("deliveryTargetDays") || null;
    const size = formData.get("size") || null;

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
    const mainImageFiles = formData.getAll("productImages");

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
    let productImages = [];

    if (mainImageFiles && mainImageFiles.length > 0) {
      for (const file of mainImageFiles) {
        if (file && file.size) {
          const savedPath = await saveFile(file, productsDir);
          productImages.push(savedPath);
        }
      }
    }

    if (productCatalogFile && productCatalogFile.size) {
      productCatalogPath = await saveFile(productCatalogFile, catalogsDir);
    }

    const mainImagePath = productImages[0] || null;
    // Insert into DB
    const connection = await db();

    const insertSQL = `
      INSERT INTO products
      (product_code, product_name, categories, category_id, brand, delivery_target_days,size,
       weekly_product, flash_sale_product, today_deals, special_product,
       actual_price, selling_price, available_quantity, stock_quantity,
       product_description, key_specifications, packaging, warranty,
       product_catalog, main_image, product_images)
      VALUES (?, ?, ?, ?, ?, ?, ?,
              ?, ?, ?, ?,
              ?, ?, ?, ?,
              ?, ?, ?, ?,
              ?, ?, ?)
    `;

    const params = [
      productCode, // product_code
      productName, // product_name
      categories, // categories
      category_id, // category_id
      brand, // brand
      deliveryTargetDays, // delivery_target_days
      size, // size ✅ FIXED

      weeklyProduct, // weekly_product
      flashSaleProduct, // flash_sale_product
      todayDeals, // today_deals
      specialProduct, // special_product

      actualPrice, // actual_price
      sellingPrice, // selling_price
      availableQuantity, // available_quantity
      stockQuantity, // stock_quantity

      productDescription, // product_description
      keySpecifications, // key_specifications
      packaging, // packaging
      warranty, // warranty

      productCatalogPath, // product_catalog
      mainImagePath, // main_image
      JSON.stringify(productImages), // product_images
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
      JSON.stringify({
        success: false,
        message: "Server error",
        error: err.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// inside app/api/products/route.js add:
export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.execute(
      `SELECT id, product_code, product_name, categories, category_id, brand,
              actual_price, selling_price, available_quantity, main_image, created_at
       FROM products ORDER BY id DESC`
    );
    await connection.end();
    return new Response(JSON.stringify({ success: true, products: rows }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 }
    );
  }
}
