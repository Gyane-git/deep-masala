'use client';

import { useState } from 'react';
import { Search, Plus, Edit, Info, Trash2,  ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      code: 'XC1678',
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      brand: 'TechSound',
      price: 2999,
      sellingPrice: 2499,
      stock: 45,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      code: 'AP2341',
      name: 'Smart Fitness Watch',
      category: 'Electronics',
      brand: 'FitTrack',
      price: 4999,
      sellingPrice: 3999,
      stock: 32,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      code: 'TS4567',
      name: 'Cotton Polo T-Shirt',
      category: 'Clothing',
      brand: 'StyleWear',
      price: 899,
      sellingPrice: 699,
      stock: 120,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      code: 'KB8901',
      name: 'Mechanical Gaming Keyboard',
      category: 'Electronics',
      brand: 'GamePro',
      price: 5999,
      sellingPrice: 4999,
      stock: 18,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop'
    },
    {
      id: 5,
      code: 'SH2234',
      name: 'Running Sports Shoes',
      category: 'Sports',
      brand: 'RunFast',
      price: 3499,
      sellingPrice: 2799,
      stock: 0,
      status: 'Out of Stock',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop'
    },
    {
      id: 6,
      code: 'WB5678',
      name: 'Stainless Steel Water Bottle',
      category: 'Home & Garden',
      brand: 'EcoLife',
      price: 799,
      sellingPrice: 599,
      stock: 85,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop'
    },
    {
      id: 7,
      code: 'BP9012',
      name: 'Travel Backpack 30L',
      category: 'Accessories',
      brand: 'TravelPro',
      price: 2499,
      sellingPrice: 1999,
      stock: 56,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop'
    },
    {
      id: 8,
      code: 'CM3456',
      name: 'Wireless Mouse',
      category: 'Electronics',
      brand: 'TechGear',
      price: 899,
      sellingPrice: 699,
      stock: 142,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop'
    },
    {
      id: 9,
      code: 'SG7890',
      name: 'Anti-Blue Light Glasses',
      category: 'Accessories',
      brand: 'VisionCare',
      price: 1299,
      sellingPrice: 999,
      stock: 73,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=100&h=100&fit=crop'
    },
    {
      id: 10,
      code: 'YM1122',
      name: 'Yoga Mat Premium',
      category: 'Sports',
      brand: 'FitZone',
      price: 1599,
      sellingPrice: 1299,
      stock: 64,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop'
    }
  ]);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleInfo = (product) => {
    setSelectedProduct(product);
    setShowInfoModal(true);
  };

  const handleEdit = (product) => {
    alert(`Edit product: ${product.name}`);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your product inventory
              </p>
            </div>
            <Link href="/admin/add-product" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
            </Link>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by product name or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Sports">Sports</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
            <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <div className="col-span-1">Image</div>
              <div className="col-span-2">Code</div>
              <div className="col-span-3">Product Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Price</div>
              <div className="col-span-1">Stock</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {paginatedProducts.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">No products found</p>
              </div>
            ) : (
              paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                >
                  <div className="col-span-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      //className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-900">{product.code}</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm font-semibold text-gray-900">
                      Rs. {product.sellingPrice}
                    </p>
                    <p className="text-xs text-gray-500 line-through">
                      Rs. {product.price}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-gray-900">{product.stock}</p>
                  </div>
                  <div className="col-span-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleInfo(product)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Info"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredProducts.length}</span> results
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 border rounded-md ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-32 h-32 rounded-lg object-cover border border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{selectedProduct.brand}</p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedProduct.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedProduct.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Code
                  </label>
                  <p className="text-gray-900">{selectedProduct.code}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <p className="text-gray-900">{selectedProduct.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Actual Price
                  </label>
                  <p className="text-gray-900">Rs. {selectedProduct.price}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Selling Price
                  </label>
                  <p className="text-gray-900 font-semibold">Rs. {selectedProduct.sellingPrice}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <p className="text-gray-900">{selectedProduct.stock} units</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <p className="text-gray-900">{selectedProduct.brand}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    handleEdit(selectedProduct);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}