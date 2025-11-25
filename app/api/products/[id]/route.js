import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const formData = await req.formData();

    // Build dynamic update fields
    const fields = [];
    const values = [];

    const updateableFields = [
      "product_name",
      "categories",
      "category_id",
      "brand",
      "delivery_target_days",
      "weekly_product",
      "flash_sale_product",
      "today_deals",
      "special_product",
      "actual_price",
      "selling_price",
      "available_quantity",
      "stock_quantity",
      "product_description",
      "key_specifications",
      "packaging",
      "warranty"
    ];

    updateableFields.forEach((field) => {
      const value = formData.get(field);
      if (value !== null) {
        fields.push(`${field} = ?`);
        values.push(value);
      }
    });

    // Handle images
    const productCatalog = formData.get("productCatalog");
    const mainImage = formData.get("mainImage");

    if (productCatalog && typeof productCatalog !== "string") {
      const bytes = await productCatalog.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fields.push("product_catalog = ?");
      values.push(buffer);
    }

    if (mainImage && typeof mainImage !== "string") {
      const bytes = await mainImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fields.push("main_image = ?");
      values.push(buffer);
    }

    if (fields.length === 0) {
      return NextResponse.json(
        { success: false, message: "Nothing to update!" },
        { status: 400 }
      );
    }

    values.push(id); // for WHERE clause

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "deepmasala",
    });

    const sql = `
      UPDATE products
      SET ${fields.join(", ")}
      WHERE id = ?
    `;

    const [result] = await connection.execute(sql, values);
    await connection.end();

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Product not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully!",
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
