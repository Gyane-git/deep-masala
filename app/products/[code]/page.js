// "use client";
"use client";

import  { useState, useEffect} from "react";
import  { Suspense } from 'react';
import { useParams } from "next/navigation";
import { 
  Star, Heart, Share2, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw,
  ChevronLeft, ChevronRight, Check, Loader2
} from "lucide-react";


export const ProductDetailPage = () => {
  const { product_code } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (!product_code) return;
    loadProductData();
  }, [product_code]);

  const loadProductData = async () => {
    try {
      setLoading(true);

      // Fetch product by code
      const productRes = await fetch(`http://localhost:3000/api/products/code/${product_code}`);
      const productData = await productRes.json();

      if (productData.success) {
        setProduct(productData.product);
        setSelectedVariant(productData.product.variants?.[0] || '');

        // Fetch related products
        if (productData.product.category_id) {
          const relatedRes = await fetch(`http://localhost:3000/api/products?category=${productData.product.category_id}`);
          const relatedData = await relatedRes.json();

          if (relatedData.success) {
            const filtered = relatedData.products
              .filter(p => p.id !== productData.product.id)
              .slice(0, 4);
            setRelatedProducts(filtered);
          }
        }
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error loading product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') setQuantity(prev => prev + 1);
    else if (type === 'decrease' && quantity > 1) setQuantity(prev => prev - 1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' 
          : i < rating ? 'fill-yellow-200 text-yellow-400'
          : 'text-gray-300'
        }`}
      />
    ));
  };

  const calculateDiscount = (selling, actual) => {
    if (!actual || actual <= selling) return 0;
    return Math.round(((actual - selling) / actual) * 100);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
    </div>
  );

  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-lg">Product not found</p>
    </div>
  );

  const images = [product.main_image, ...(product.additional_images || [])].filter(Boolean);
  const discount = calculateDiscount(product.selling_price, product.actual_price);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="hover:text-gray-700 cursor-pointer">Home</span> / 
        <span className="hover:text-gray-700 cursor-pointer ml-1">{product.category_name || 'Category'}</span> / 
        <span className="text-gray-900 ml-1">{product.product_name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative group">
            <img
              src={images[selectedImage] || 'https://via.placeholder.com/500'}
              alt={product.product_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-blue-500 scale-105' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`view ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right - Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.product_name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {renderStars(product.rating || 4.5)}
              <span className="text-sm text-gray-600 ml-1">({product.review_count || 0})</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 hover:border-red-500 hover:text-red-500 transition-all">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {product.product_code && (
            <p className="text-sm text-gray-500">SKU: <span className="font-medium text-gray-700">{product.product_code}</span></p>
          )}

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">Rs. {product.selling_price}</span>
            {product.actual_price && product.actual_price > product.selling_price && (
              <>
                <span className="text-xl text-gray-500 line-through">Rs. {product.actual_price}</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">{discount}% OFF</span>
              </>
            )}
          </div>

          {product.variants?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Option</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(v => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-lg border transition-all ${selectedVariant === v ? 'border-blue-500 bg-blue-50 text-blue-700 scale-105' : 'border-gray-300 hover:border-gray-400'}`}
                  >{v}</button>
                ))}
              </div>
            </div>
          )}

          {product.short_description && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-700">{product.short_description}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => handleQuantityChange('decrease')} className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled={quantity<=1}><Minus className="w-4 h-4"/></button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center font-medium">{quantity}</span>
                <button onClick={() => handleQuantityChange('increase')} className="p-2 hover:bg-gray-50 transition-colors"><Plus className="w-4 h-4"/></button>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5"/> Add to Cart
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30">Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Related Products */}
      {/* ... You can copy your tabs & related products code here ... */}
    </div>
  );
};


 


// Function declaration
export default function Page() {
  return <Suspense fallback={<div>Loading...</div>}>
    <ProductDetailPage />
  </Suspense>;
}

// "use client";

// import React from "react";
// import { useParams } from "next/navigation";

// export default function Page() {
//   const { code } = useParams();

//   return (
//     <div>
//       <h1>Product Code: {code}</h1>
//     </div>
//   );
// }
