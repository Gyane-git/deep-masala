import { useState, useEffect } from "react";
import Link from "next/link";
import { Grid, List, Search, Heart, RotateCcw, ChevronDown } from "lucide-react";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:3000/api/products"),
          fetch("http://localhost:3000/api/categories"),
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        if (productsData.success) setProducts(productsData.products);
        if (categoriesData.success) setCategories(categoriesData.categories);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch =
      searchQuery === "" ||
      p.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.product_code?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      p.category_id?.toString() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">Showing {filtered.length} products</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 animate-slideDown">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id.toString())}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id.toString()
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search & View Toggle */}
            <div className="flex gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-initial lg:w-72">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 border text-black border-gray-400 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filtered.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.product_code}`}
                className={`group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden animate-fadeInUp ${
                  viewMode === "list" ? "flex" : ""
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image Section */}
                <div
                  className={`relative overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center ${
                    viewMode === "list" ? "w-48 h-48 flex-shrink-0" : "h-72 md:h-80"
                  }`}
                >
                  <img
                    src={product.main_image || "https://via.placeholder.com/400x300"}
                    alt={product.product_name}
                    className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-xl"></div>

                  {/* Quick Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                      <Heart size={18} className="text-red-500" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                      <RotateCcw size={18} className="text-blue-500" />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.special && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                        Discount
                      </span>
                    )}
                    {product.actual_price && product.selling_price < product.actual_price && (
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                        Sale
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-5 flex-1 ${
                    viewMode === "list" ? "flex flex-col justify-center" : ""
                  }`}
                >
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.product_name || "Unnamed Product"}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <p className="text-2xl font-bold text-gray-900">
                      Rs. {product.selling_price || 0}
                    </p>
                    {product.actual_price &&
                      product.actual_price > product.selling_price && (
                        <>
                          <p className="text-sm text-gray-500 line-through">
                            Rs. {product.actual_price}
                          </p>
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                            {Math.round(
                              ((product.actual_price - product.selling_price) /
                                product.actual_price) *
                                100
                            )}
                            % OFF
                          </span>
                        </>
                      )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-500">(124)</span>
                  </div>

                  {/* Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-600/20">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}