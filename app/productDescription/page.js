"use client";
import { useState, useEffect } from 'react';
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
  Loader2
} from 'lucide-react';

const ProductDetailPage = ({ product_code = "PRD52980725417" }) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  

  useEffect(() => {
    loadProductData();
  }, [product_code]);

  const loadProductData = async () => {
    try {
      setLoading(true);
      
      // Fetch product details
      const productRes = await fetch(`http://localhost:3000/api/products/${productId}`);
      const productData = await productRes.json();
      
      if (productData.success) {
        setProduct(productData.product);
        setSelectedVariant(productData.product.variants?.[0] || '');
        
        // Fetch related products from same category
        if (productData.product.category_id) {
          const relatedRes = await fetch(`http://localhost:3000/api/products?category=${productData.product.category_id}`);
          const relatedData = await relatedRes.json();
          
          if (relatedData.success) {
            // Filter out current product and limit to 4
            const filtered = relatedData.products
              .filter(p => p.id !== productData.product.id)
              .slice(0, 4);
            setRelatedProducts(filtered);
          }
        }
      }
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const calculateDiscount = (selling, actual) => {
    if (!actual || actual <= selling) return 0;
    return Math.round(((actual - selling) / actual) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  // Prepare image array
  const images = [
    product.main_image,
    ...(product.additional_images || [])
  ].filter(Boolean);

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
        {/* Left Column - Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative group">
            <img
              src={images[selectedImage] || 'https://via.placeholder.com/500'}
              alt={product.product_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Image Navigation */}
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

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-blue-500 scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.product_name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.product_name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating || 4.5)}
                <span className="text-sm text-gray-600 ml-1">
                  ({product.review_count || 0} reviews)
                </span>
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

            {/* Product Code */}
            {product.product_code && (
              <p className="text-sm text-gray-500">
                SKU: <span className="font-medium text-gray-700">{product.product_code}</span>
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              Rs. {product.selling_price}
            </span>
            {product.actual_price && product.actual_price > product.selling_price && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  Rs. {product.actual_price}
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Option</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedVariant === variant
                        ? 'border-blue-500 bg-blue-50 text-blue-700 scale-105'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description Preview */}
          {product.short_description && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-700">{product.short_description}</p>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center font-medium">
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
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30">
                Buy Now
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Free Delivery</p>
                <p className="text-sm text-gray-600">Estimated delivery: 3-5 business days</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <RotateCcw className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">30-Day Returns</p>
                <p className="text-sm text-gray-600">Easy returns and exchanges</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Warranty Included</p>
                <p className="text-sm text-gray-600">Manufacturer warranty included</p>
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className={`flex items-center gap-2 ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
            {product.in_stock ? (
              <>
                <Check className="w-5 h-5" />
                <span className="font-medium">In Stock - Ready to Ship</span>
              </>
            ) : (
              <span className="font-medium">Out of Stock</span>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'description'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'specifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Specifications
            </button>
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }}
              />
              
              {product.features && product.features.length > 0 && (
                <>
                  <h4 className="text-lg font-semibold mb-3 mt-6">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No specifications available.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => {
              const itemDiscount = calculateDiscount(item.selling_price, item.actual_price);
              return (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={item.main_image || 'https://via.placeholder.com/300'}
                      alt={item.product_name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.product_name}
                    </h4>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {renderStars(item.rating || 4.5)}
                      </div>
                      <span className="text-sm text-gray-500">({item.review_count || 0})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">Rs. {item.selling_price}</span>
                      {item.actual_price && item.actual_price > item.selling_price && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            Rs. {item.actual_price}
                          </span>
                          {itemDiscount > 0 && (
                            <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                              -{itemDiscount}%
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;