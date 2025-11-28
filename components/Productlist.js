"use client";

import { useState, useEffect } from "react";
import { Grid, View, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductListPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      if (data.success) setProducts(data.products);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.product_name?.toLowerCase().includes(q) ||
      p.product_code?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-amber-200">
        <div>
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-gray-500">
            Showing {filtered.length} products
          </p>
        </div>

        {/* Search */}
        <div className="relative w-72 bg-gray-100 rounded-lg">
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-gray-300 rounded-2xl shadow hover:shadow-xl transition cursor-pointer p-4"
            onClick={() => router.push(`/admin/product-list/${product.id}`)}
          >
            {/* Image */}
            <div className="relative mb-4">
              <img
                src={product.main_image}
                className="w-full h-72 object-cover rounded-xl"
                alt={product.product_name}
              />

              {/* Badge */}
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                New
              </span>
            </div>

            {/* Name */}
            <h3 className="font-semibold text-lg  text-black leading-tight">
              {product.product_name || "Unnamed Product"}
            </h3>

            {/* Price */}
            <div className="mt-2">
              <p className="text-xl font-bold text-gray-800">
                ${product.selling_price || 0}
              </p>

              {product.actual_price && (
                <p className="text-sm text-gray-500 line-through">
                  ${product.actual_price}
                </p>
              )}
            </div>

            {/* Rating (Static placeholder) */}
            <div className="flex items-center mt-2 gap-1">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="font-medium text-gray-700">4.8</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
