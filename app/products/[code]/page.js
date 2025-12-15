"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react";

export default function ProductDetailPage() {
  const { code } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!code) return;

    const loadProduct = async () => {
      try {
        const res = await fetch(`/api/products/${code}`);
        const data = await res.json();
        if (data.success) setProduct(data.product);
        else setProduct(null);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [code]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );

  const images = [product.main_image].filter(Boolean);
  const discount =
    product.actual_price && product.actual_price > product.selling_price
      ? Math.round(
          ((product.actual_price - product.selling_price) /
            product.actual_price) *
            100
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        Home / Products /{" "}
        <span className="text-gray-900">{product.product_name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative">
            <img
              src={images[selectedImage]}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage((i) => (i > 0 ? i - 1 : images.length - 1))
                  }
                  className="absolute left-4 top-1/2 bg-white/80 p-2 rounded-full"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((i) => (i < images.length - 1 ? i + 1 : 0))
                  }
                  className="absolute right-4 top-1/2 bg-white/80 p-2 rounded-full"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.product_name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">(0 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">
              Rs. {product.selling_price}
            </span>
            {product.actual_price && (
              <>
                <span className="line-through text-gray-400">
                  Rs. {product.actual_price}
                </span>
                {discount > 0 && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="p-2"
              >
                <Minus />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2"
              >
                <Plus />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2">
              <ShoppingCart /> Add to Cart
            </button>
            <button className="bg-orange-500 text-white px-6 rounded-lg">
              Buy Now
            </button>
          </div>

          {/* Info boxes */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex gap-3">
              <Truck className="text-blue-600" />
              Free Delivery
            </div>
            <div className="flex gap-3">
              <RotateCcw className="text-green-600" />
              Easy Returns
            </div>
            <div className="flex gap-3">
              <Shield className="text-purple-600" />
              Warranty Included
            </div>
          </div>

          <div className="flex items-center gap-2 text-green-600">
            <Check /> In Stock
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b">
          {["description", "specifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <p className="text-gray-700">
              {product.product_description}
            </p>
          )}
          {activeTab === "specifications" && (
            <p className="text-gray-700">
              {product.key_specifications}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
