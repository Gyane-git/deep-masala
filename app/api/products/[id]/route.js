import mysql from "mysql2/promise";
import { writeFile } from "fs/promises";
import path from "path";

/** DB Connection */
async function db() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "deepmasala",
  });
}

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const connection = await db();
    const [rows] = await connection.execute(
      "SELECT * FROM products WHERE id = ? LIMIT 1",
      [id]
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
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 }
    );
  }
}




function sanitizeFilename(name) {
  return name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "");
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const formData = await req.formData();

    // Text Fields
    const productName = formData.get("productName") || null;
    const productCode = formData.get("productCode") || null;
    const categories = formData.get("categories") || null;
    const category_id = formData.get("category_id") || null;
    const brand = formData.get("brand") || null;
    const deliveryTargetDays = formData.get("deliveryTargetDays") || null;

    const weeklyProduct = formData.get("weeklyProduct") ? 1 : 0;
    const flashSaleProduct = formData.get("flashSaleProduct") ? 1 : 0;
    const todayDeals = formData.get("todayDeals") ? 1 : 0;
    const specialProduct = formData.get("specialProduct") ? 1 : 0;

    const size = formData.get("size") || null;

    const actualPrice = formData.get("actualPrice") || null;
    const sellingPrice = formData.get("sellingPrice") || null;
    const availableQuantity = formData.get("availableQuantity") || null;
    const stockQuantity = formData.get("stockQuantity") || null;

    const productDescription = formData.get("productDescription") || null;
    const keySpecifications = formData.get("keySpecifications") || null;
    const packaging = formData.get("packaging") || null;
    const warranty = formData.get("warranty") || null;

    // File Uploads
    const productCatalogFile = formData.get("productCatalog");
    const mainImageFile = formData.get("mainImage");

    const productsDir = path.join(process.cwd(), "public/upload/products");
    const catalogsDir = path.join(process.cwd(), "public/upload/catalogs");

    const saveFile = async (file, destDir) => {
      if (!file || typeof file === "string") return null;
      const filenameRaw = file.name;
      const safeName = Date.now() + "-" + sanitizeFilename(filenameRaw);
      const uploadPath = path.join(destDir, safeName);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(uploadPath, buffer);

      return `/upload/${path.basename(destDir)}/${safeName}`;
    };

    let newCatalogPath = null;
    let newMainImagePath = null;

    if (productCatalogFile && productCatalogFile.size > 0) {
      newCatalogPath = await saveFile(productCatalogFile, catalogsDir);
    }

    if (mainImageFile && mainImageFile.size > 0) {
      newMainImagePath = await saveFile(mainImageFile, productsDir);
    }

    const connection = await db();

    const updateSQL = `
      UPDATE products SET
        product_code = ?, product_name = ?, categories = ?, category_id = ?, brand = ?, delivery_target_days = ?,
        weekly_product = ?, flash_sale_product = ?, today_deals = ?, special_product = ?, size = ?,
        actual_price = ?, selling_price = ?, available_quantity = ?, stock_quantity = ?,
        product_description = ?, key_specifications = ?, packaging = ?, warranty = ?,
        product_catalog = COALESCE(?, product_catalog),
        main_image = COALESCE(?, main_image)
      WHERE id = ?
    `;

    const params = [
      productCode,
      productName,
      categories,
      category_id,
      brand,
      deliveryTargetDays,
      weeklyProduct,
      flashSaleProduct,
      todayDeals,
      specialProduct,
      size,
      actualPrice,
      sellingPrice,
      availableQuantity,
      stockQuantity,
      productDescription,
      keySpecifications,
      packaging,
      warranty,
      newCatalogPath,
      newMainImagePath,
      id,
    ];

    await connection.execute(updateSQL, params);
    await connection.end();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product updated successfully",
        mainImage: newMainImagePath,
        productCatalog: newCatalogPath,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT ERROR:", err);
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 }
    );
  }
}
