"use client";

import { useState } from "react";
import { useEffect } from "react";

import { Upload,   Save, RotateCcw } from "lucide-react";

export default function ProductUploadPage() {
  // Generate unique product code
  const generateProductCode = () => {
    const prefix = "PRD";
    // eslint-disable-next-line react-hooks/purity
    const timestamp = Date.now().toString().slice(-8);
    // eslint-disable-next-line react-hooks/purity
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}${timestamp}${random}`;
  };
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories"); // Or your Laravel URL
      const data = await res.json();
      if (data.success) setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    productCode: generateProductCode(),
    productName: "",
    category: "",
    brand: "",
    deliveryTargetDays: "",
    weeklyProduct: false,
    flashSaleProduct: false,
    todayDeals: false,
    specialProduct: false,
    actualPrice: "",
    sellingPrice: "",
    availableQuantity: "",
    stockQuantity: "",
    productDescription: "",
    keySpecifications: "",
    packaging: "",
    warranty: "",
    productCatalog: null,
    mainImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleReset = () => {
    setFormData({
      productCode: generateProductCode(), // Generate new code on reset
      productName: "",
      category: "",
      brand: "",
      deliveryTargetDays: "",
      weeklyProduct: false,
      flashSaleProduct: false,
      todayDeals: false,
      specialProduct: false,
      actualPrice: "",
      sellingPrice: "",
      availableQuantity: "",
      stockQuantity: "",
      productDescription: "",
      keySpecifications: "",
      packaging: "",
      warranty: "",
      productCatalog: null,
      mainImage: null,
    });
  };

  const handleSubmit = async () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) alert("Product uploaded successfully!");
      else alert(result.message);
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Product
            </h1>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              + Switch to Bulk Upload
            </button>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info & Features */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="productCode"
                        value={formData.productCode}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                      <div className="absolute right-3 top-2.5">
                        <span className="text-xs text-gray-500">
                          Auto-generated
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Target Days
                    </label>
                    <input
                      type="number"
                      name="deliveryTargetDays"
                      value={formData.deliveryTargetDays}
                      onChange={handleInputChange}
                      placeholder="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Product Flags */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        name="weeklyProduct"
                        checked={formData.weeklyProduct}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3">
                      <label className="text-sm font-medium text-gray-700">
                        Weekly Product
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        name="flashSaleProduct"
                        checked={formData.flashSaleProduct}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3">
                      <label className="text-sm font-medium text-gray-700">
                        Flash Sale Product
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        name="todayDeals"
                        checked={formData.todayDeals}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3">
                      <label className="text-sm font-medium text-gray-700">
                        Today Deals
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        name="specialProduct"
                        checked={formData.specialProduct}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3">
                      <label className="text-sm font-medium text-gray-700">
                        Special Product
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Description
                </h2>
                <textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Enter detailed product description..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Key Specifications */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Specifications
                </h2>
                <textarea
                  name="keySpecifications"
                  value={formData.keySpecifications}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Enter key specifications..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Packaging */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Packaging
                </h2>
                <textarea
                  name="packaging"
                  value={formData.packaging}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Enter packaging details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Warranty */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Warranty
                </h2>
                <textarea
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Enter warranty information..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Column - Pricing & Images */}
            <div className="space-y-6">
              {/* Pricing & Inventory */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Pricing & Inventory
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Actual Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">
                        Rs.
                      </span>
                      <input
                        type="number"
                        name="actualPrice"
                        value={formData.actualPrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selling Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">
                        Rs.
                      </span>
                      <input
                        type="number"
                        name="sellingPrice"
                        value={formData.sellingPrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Quantity
                    </label>
                    <input
                      type="number"
                      name="availableQuantity"
                      value={formData.availableQuantity}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Product Image & Catalogue */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Image & Catalogue
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Catalogue
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="catalog"
                        onChange={(e) => handleFileChange(e, "productCatalog")}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <label htmlFor="catalog" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          {formData.productCatalog
                            ? formData.productCatalog.name
                            : "Choose file or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, DOC up to 10MB
                        </p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="mainImage"
                        onChange={(e) => handleFileChange(e, "mainImage")}
                        className="hidden"
                        accept="image/*"
                      />
                      <label htmlFor="mainImage" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          {formData.mainImage
                            ? formData.mainImage.name
                            : "Choose file or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
