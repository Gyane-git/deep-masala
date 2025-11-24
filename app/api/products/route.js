import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const form = formidable({ multiples: true });

    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { fields, files } = data;

    // File handling
    const uploadDir = path.join(process.cwd(), "public", "upload");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Move main image
    let mainImagePath = null;
    if (files.mainImage) {
      const file = files.mainImage[0] || files.mainImage;
      const mainImageName = `${Date.now()}-${file.originalFilename}`;
      const mainImageDest = path.join(uploadDir, "product-image", mainImageName);

      fs.mkdirSync(path.dirname(mainImageDest), { recursive: true });
      fs.renameSync(file.filepath, mainImageDest);

      mainImagePath = `/upload/product-image/${mainImageName}`;
    }

    // Move catalog
    let productCatalogPath = null;
    if (files.productCatalog) {
      const file = files.productCatalog[0] || files.productCatalog;
      const catalogName = `${Date.now()}-${file.originalFilename}`;
      const catalogDest = path.join(uploadDir, "product-catalog", catalogName);

      fs.mkdirSync(path.dirname(catalogDest), { recursive: true });
      fs.renameSync(file.filepath, catalogDest);

      productCatalogPath = `/upload/product-catalog/${catalogName}`;
    }

    // Prepare DB insert
    const conn = await db();
    const query = `
      INSERT INTO products
      (
        product_code, product_name, category_id, brand_id, delivery_target_days,
        weekly_product, flash_sale_product, today_deals, special_product,
        actual_price, selling_price, available_quantity, stock_quantity,
        product_description, key_specifications, packaging, warranty,
        main_image, product_catalog
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const params = [
      fields.productCode,
      fields.productName,
      fields.category || null,
      null, // brand null
      fields.deliveryTargetDays || 0,
      fields.weeklyProduct === "true" ? 1 : 0,
      fields.flashSaleProduct === "true" ? 1 : 0,
      fields.todayDeals === "true" ? 1 : 0,
      fields.specialProduct === "true" ? 1 : 0,
      fields.actualPrice || 0,
      fields.sellingPrice || 0,
      fields.availableQuantity || 0,
      fields.stockQuantity || 0,
      fields.productDescription || "",
      fields.keySpecifications || "",
      fields.packaging || "",
      fields.warranty || "",
      mainImagePath,
      productCatalogPath,
    ];

    await conn.execute(query, params);

    return NextResponse.json({ message: "Product saved with files!" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error uploading product", error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const conn = await db();
    const [rows] = await conn.execute("SELECT * FROM products");
    return NextResponse.json({ success: true, products: rows }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error fetching products", error: err.message }, { status: 500 });
  }
}
