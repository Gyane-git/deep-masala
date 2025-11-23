"use client"
import React, { useState } from 'react';
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
  Check
} from 'lucide-react';

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('1.5MM');
  const [activeTab, setActiveTab] = useState('description');

  // Sample product data based on the screenshot
  const product = {
    id: 1,
    name: "Professional Hair Trimmer Barber Rechargeable Men Hair Clipper Set",
    price: 249,
    originalPrice: 299,
    discount: 17,
    rating: 4.4,
    reviews: 156,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?w=500&h=500&fit=crop",
      "https://s.alicdn.com/@sc04/kf/H87bf1a2bf5dc468faa692599975a733cX/IClipper-I8-New-Rechargeable-Trimmer-Beard-Shaving-Machine-Hair-Clippers-Trimer-for-Men.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-Ff0ZeCHBNr8oHuphvfwF2fiVINhXACYW2jG8JrKMlPnaucMo9TGIOleQwXbeVEPBKc&usqp=CAU"
    ],
    variants: ['1.5MM', '2MM', '3MM', '4MM'],
    features: [
      "Rechargeable battery with 120 minutes runtime",
      "Titanium coated ceramic blades",
      "Adjustable cutting lengths 0.5-25mm",
      "Waterproof design for easy cleaning",
      "LED display showing battery level",
      "Professional grade motor"
    ],
    specifications: {
      "Power": "15W",
      "Battery": "2000mAh Li-ion",
      "Charging Time": "2 hours",
      "Runtime": "120 minutes",
      "Blade Material": "Titanium ceramic",
      "Weight": "280g"
    }
  };

  const reviews = [
    {
      id: 1,
      name: "John D.",
      rating: 5,
      date: "2024-08-15",
      comment: "Excellent trimmer! Very quiet and cuts smoothly. Battery lasts a long time.",
      verified: true
    },
    {
      id: 2,
      name: "Mike R.",
      rating: 4,
      date: "2024-08-10",
      comment: "Good quality for the price. The different guide combs are very useful.",
      verified: true
    }
  ];

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-200 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span>Home</span> / <span>Beauty & Personal Care</span> / <span>Hair Trimmers</span> / <span className="text-gray-900">Professional Hair Trimmer</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            <button
              onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600 ml-1">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">Rs. {product.price}</span>
            <span className="text-xl text-gray-500 line-through">Rs. {product.originalPrice}</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
              {product.discount}% OFF
            </span>
          </div>

          {/* Variant Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Cutting Length</h3>
            <div className="flex gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedVariant === variant
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="p-2 hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="p-2 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                Buy Now
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-gray-600">Estimated delivery: 3-5 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">30-Day Returns</p>
                <p className="text-sm text-gray-600">Easy returns and exchanges</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium">1 Year Warranty</p>
                <p className="text-sm text-gray-600">Manufacturer warranty included</p>
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-green-600">
            <Check className="w-5 h-5" />
            <span className="font-medium">In Stock - Ready to Ship</span>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700 mb-4">
                This professional-grade hair trimmer is designed for both professional barbers and home use. 
                Featuring advanced titanium ceramic blades and a powerful motor, it delivers precise cuts every time.
              </p>
              <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">{key}:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Write Review
                </button>
              </div>

              {/* Rating Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold">{product.rating}</span>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(product.rating)}
                    </div>
                    <p className="text-gray-600">Based on {product.reviews} reviews</p>
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm w-8">{star}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{star === 5 ? 109 : star === 4 ? 31 : star === 3 ? 8 : star === 2 ? 5 : 3}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-blue-600">{review.name[0]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-8">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100">
                <img
                  src={`https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=500&fit=crop`}
                  alt={`Related product ${item}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">Hair Trimmer Pro {item}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {renderStars(4.2)}
                  </div>
                  <span className="text-sm text-gray-500">(89)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Rs. {199 + item * 50}</span>
                  <span className="text-sm text-gray-500 line-through">Rs. {249 + item * 50}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;