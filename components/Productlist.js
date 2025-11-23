"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

 

import { Star, ShoppingCart, Heart, Filter, Grid, List } from "lucide-react";


const ProductListingPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();


  // Sample products with varying quantities per category
  const products = [
    // Electronics - iPhone (4 products)
    {
      id: 1,
      category: "Electronics",
      subcategory: "Phones",
      subSubcategory: "iPhone",
      name: "iPhone 15 Pro Max",
      description:
        "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
      price: 1199,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 1247,
      image:
        "/images/product/Aloo-Sabji-Masala-01-1.png.webp",
      badge: "New",
    },
    {
      id: 2,
      category: "Electronics",
      subcategory: "Phones",
      subSubcategory: "iPhone",
      name: "iPhone 14 Pro",
      description:
        "Professional photography with 48MP main camera and Dynamic Island",
      price: 999,
      originalPrice: 1099,
      rating: 4.7,
      reviews: 2156,
      image:
        "/images/product/ambhar-masala.png.webp",
      badge: "Sale",
    },
    {
      id: 3,
      category: "Electronics",
      subcategory: "Phones",
      subSubcategory: "iPhone",
      name: "iPhone 13",
      description:
        "Reliable performance with A15 Bionic chip and excellent battery life",
      price: 729,
      rating: 4.6,
      reviews: 3421,
      image:
        "/images/product/Butter-Chicken-Mix-01.png.webp",
    },
    {
      id: 4,
      category: "Electronics",
      subcategory: "Phones",
      subSubcategory: "iPhone",
      name: "iPhone SE",
      description:
        "Compact design with powerful A15 Bionic chip at an affordable price",
      price: 429,
      rating: 4.4,
      reviews: 891,
      image:
        "/images/product/chaat-masala.png.webp",
    },

    // Electronics - Samsung (2 products)
    {
      id: 5,
      category: "Electronics",
      subcategory: "Phones",
      subSubcategory: "Samsung",
      name: "Galaxy S24 Ultra",
      description:
        "Premium Android flagship with S Pen, 200MP camera, and AI features",
      price: 1299,
      rating: 4.7,
      reviews: 1834,
      image:
        "/images/product/chhole-masala.png.webp",
      badge: "Featured",
    },
    {
      id: 6,
      category: "Electronics",
      subcategory: "Phones",
      subSubcategory: "Samsung",
      name: "Galaxy A54",
      description:
        "Mid-range smartphone with great camera and long-lasting battery",
      price: 449,
      rating: 4.3,
      reviews: 756,
      image:
        "/images/product/Chicken-65-Kabab-Masala-02-FI.png.webp",
    },

    // Electronics - Laptops (3 products)
    {
      id: 7,
      category: "Electronics",
      subcategory: "Laptops",
      subSubcategory: "MacBook",
      name: 'MacBook Pro 16"',
      description:
        "Powerful laptop for professionals with M3 Pro chip and stunning display",
      price: 2499,
      rating: 4.9,
      reviews: 567,
      image:
        "/images/product/Chicken-Biryani-Masala-02-FI.png.webp",
      badge: "Best Seller",
    },
    {
      id: 8,
      category: "Electronics",
      subcategory: "Laptops",
      subSubcategory: "Dell",
      name: "Dell XPS 13",
      description:
        "Ultra-portable laptop with premium build quality and excellent performance",
      price: 1299,
      rating: 4.5,
      reviews: 1023,
      image:
        "/images/product/Chicken-Biryani-Mix-01.png.webp",
    },
    {
      id: 9,
      category: "Electronics",
      subcategory: "Laptops",
      subSubcategory: "HP",
      name: "HP Spectre x360",
      description:
        "Convertible laptop with stunning design and versatile functionality",
      price: 1199,
      originalPrice: 1399,
      rating: 4.4,
      reviews: 634,
      image:
        "/images/product/Chicken-Curry-Mix-01.png.webp",
      badge: "Sale",
    },

    // Electronics - Headphones (1 product)
    {
      id: 10,
      category: "Electronics",
      subcategory: "Headphones",
      name: "Sony WH-1000XM5",
      description:
        "Industry-leading noise canceling wireless headphones with premium sound",
      price: 399,
      rating: 4.8,
      reviews: 2341,
      image:
        "/images/product/chiken-masal.png.webp",
      badge: "Top Rated",
    },

    // Fashion - Men (3 products)
    {
      id: 11,
      category: "Fashion",
      subcategory: "Men",
      subSubcategory: "Shirts",
      name: "Premium Cotton Dress Shirt",
      description: "Classic white dress shirt made from 100% premium cotton",
      price: 89,
      rating: 4.3,
      reviews: 234,
      image:
        "/images/product/Chilli-Flakes-01-1.png.webp",
    },
    {
      id: 12,
      category: "Fashion",
      subcategory: "Men",
      subSubcategory: "Pants",
      name: "Slim Fit Chinos",
      description:
        "Comfortable and stylish chinos perfect for casual and business casual wear",
      price: 79,
      originalPrice: 99,
      rating: 4.2,
      reviews: 456,
      image:
        "/images/product/cumin-front.png.webp",
      badge: "Sale",
    },
    {
      id: 13,
      category: "Fashion",
      subcategory: "Men",
      subSubcategory: "Shoes",
      name: "Leather Oxford Shoes",
      description: "Handcrafted leather shoes perfect for formal occasions",
      price: 199,
      rating: 4.6,
      reviews: 178,
      image:
        "/images/product/Desi-Chicken-Masala-7g-01.png.webp",
    },

    // Fashion - Women (2 products)
    {
      id: 14,
      category: "Fashion",
      subcategory: "Women",
      subSubcategory: "Dresses",
      name: "Elegant Evening Dress",
      description: "Sophisticated black dress perfect for special occasions",
      price: 159,
      rating: 4.7,
      reviews: 123,
      image:
        "/images/product/Desi-Meat-Masala-01.png.webp",
    },
    {
      id: 15,
      category: "Fashion",
      subcategory: "Women",
      subSubcategory: "Heels",
      name: "Classic Pointed Heels",
      description: "Timeless pointed-toe heels that complement any outfit",
      price: 129,
      originalPrice: 159,
      rating: 4.4,
      reviews: 267,
      image:
        "/images/product/dry-ginger-front.png (1).webp",
      badge: "Sale",
    },

    // Home - Furniture (4 products)
    {
      id: 16,
      category: "Home",
      subcategory: "Furniture",
      subSubcategory: "Sofa",
      name: "Modern Sectional Sofa",
      description:
        "Comfortable L-shaped sectional sofa perfect for living rooms",
      price: 1299,
      rating: 4.5,
      reviews: 89,
      image:
        "/images/product/dry-mango-front.png.webp",
    },
    {
      id: 17,
      category: "Home",
      subcategory: "Furniture",
      subSubcategory: "Table",
      name: "Oak Dining Table",
      description:
        "Solid oak dining table that seats up to 6 people comfortably",
      price: 899,
      rating: 4.8,
      reviews: 156,
      image:
        "/images/product/Frame-1-1.png.webp",
    },
    {
      id: 18,
      category: "Home",
      subcategory: "Furniture",
      subSubcategory: "Chair",
      name: "Ergonomic Office Chair",
      description:
        "Professional office chair with lumbar support and adjustable height",
      price: 299,
      originalPrice: 399,
      rating: 4.3,
      reviews: 341,
      image:
        "/images/product/Frame-2.png.webp",
      badge: "Sale",
    },
    {
      id: 19,
      category: "Home",
      subcategory: "Furniture",
      subSubcategory: "Chair",
      name: "Vintage Armchair",
      description:
        "Classic armchair with premium upholstery and timeless design",
      price: 599,
      rating: 4.6,
      reviews: 78,
      image:
        "/images/product/Frame-3.png.webp",
    },

    // Kids - Toys (2 products)
    {
      id: 20,
      category: "Kids",
      subcategory: "Toys",
      subSubcategory: "LEGO",
      name: "LEGO Architecture Set",
      description: "Build famous landmarks with this detailed architecture set",
      price: 79,
      rating: 4.9,
      reviews: 432,
      image:
        "/images/product/Frame-4.png.webp",
      badge: "Popular",
    },
    {
      id: 21,
      category: "Kids",
      subcategory: "Toys",
      subSubcategory: "Games",
      name: "Educational Board Game",
      description: "Fun and educational board game for kids ages 8 and up",
      price: 29,
      rating: 4.4,
      reviews: 234,
      image:
        "/images/product/front-1-2.png.webp",
    },

    // Books (1 product - category only)
    {
      id: 22,
      category: "Books",
      name: "The Art of Programming",
      description:
        "Comprehensive guide to modern programming techniques and best practices",
      price: 49,
      rating: 4.7,
      reviews: 567,
      image:
        "/images/product/front-2-1.png.webp",
    },
    {
      id: 23,
      category: "Books",
      name: "The Art of Programming",
      description:
        "Comprehensive guide to modern programming techniques and best practices",
      price: 49,
      rating: 4.7,
      reviews: 567,
      image:
        "/images/product/front-3.png.webp",
    },{
      id: 24,
      category: "Books",
      name: "The Art of Programming",
      description:
        "Comprehensive guide to modern programming techniques and best practices",
      price: 49,
      rating: 4.7,
      reviews: 567,
      image:
        "/images/product/front-4.png.webp",
    },{
      id: 25,
      category: "Books",
      name: "The Art of Programming",
      description:
        "Comprehensive guide to modern programming techniques and best practices",
      price: 49,
      rating: 4.7,
      reviews: 567,
      image:
        "/images/product/front-5.png.webp",
    },
  ];

  const categories = ["all", "Electronics", "Fashion", "Home", "Kids", "Books"];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className=" max-w-8xl mx-auto  rounded-lg mt-5.5 z-0 product-list-container">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-8xl mx-auto px-6 py-5 ">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedCategory === "all" ? "All Products" : selectedCategory}
              </h1>
              <p className="text-gray-600 mt-1">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm w-full max-w-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1111 5a6 6 0 016 6z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 outline-none border-none text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        <div
          className={`grid gap-4 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/productDescription`)}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              {/* Product Image */}
              <div
                className={`relative ${
                  viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.badge === "New"
                          ? "bg-green-100 text-green-800"
                          : product.badge === "Sale"
                          ? "bg-red-100 text-red-800"
                          : product.badge === "Featured"
                          ? "bg-purple-100 text-purple-800"
                          : product.badge === "Best Seller"
                          ? "bg-yellow-100 text-yellow-800"
                          : product.badge === "Top Rated"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}

                
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1">
                {/* Category Path */}
                {/* <div className="text-xs text-gray-500 mb-2">
                  {product.category}
                  {product.subcategory && ` > ${product.subcategory}`}
                  {product.subSubcategory && ` > ${product.subSubcategory}`}
                </div> */}

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Description */}
                {/* <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p> */}

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.rating}
                    {/* ({product.reviews}) */}
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
