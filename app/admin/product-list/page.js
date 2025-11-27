"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";

const PRODUCT_API = "/api/products";
const CATEGORY_API = "/api/categories";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch Products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(PRODUCT_API);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Products fetch error:", err);
      }
    }
    fetchProducts();
  }, []);

  // Fetch Categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(CATEGORY_API);
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Categories fetch error:", err);
      }
    }
    fetchCategories();
  }, []);

  // Filter Products by search & category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.product_name.toLowerCase().includes(search.toLowerCase()) ||
      (p.product_code || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || p.categories === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    await fetch(`${PRODUCT_API}/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-60"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="w-full h-48 relative mb-3 bg-gray-100 rounded overflow-hidden">
              <Image
                src={product.main_image || "/no-image.png"}
                alt={product.product_name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <h2 className="font-bold text-lg">{product.product_name}</h2>
            <p className="text-sm text-gray-600">
              Category: {product.categories || "No Category"}
            </p>
            <p className="text-sm text-gray-600">
              Code: {product.product_code}
            </p>
            <p className="text-sm text-gray-600">
              Brand: {product.brand || "No Brand"}
            </p>
            <p className="font-semibold text-green-600 mt-1">
              Rs. {product.selling_price}
            </p>
            <p className="text-xs line-through text-gray-400">
              Rs. {product.actual_price}
            </p>
            <p className="text-sm mt-1">
              Available Quantity: {product.available_quantity || 0}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded">
                <Edit2 size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
