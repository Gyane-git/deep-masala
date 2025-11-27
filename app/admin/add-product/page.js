"use client";

import { useState, useEffect } from "react";
import { Upload, Save, RotateCcw } from "lucide-react";

export default function ProductUploadPage() {
  const generateProductCode = () => {
    const prefix = "PRD";
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}${timestamp}${random}`;
  };

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productCode: generateProductCode(),
    productName: "",
    category_id: "",
    categories: "",
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) setCategories(data.categories);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selectedCat = categories.find((c) => c.id.toString() === selectedId);
    setFormData((prev) => ({
      ...prev,
      category_id: selectedId,
      categories: selectedCat?.name || "",
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
      productCode: generateProductCode(),
      productName: "",
      category_id: "",
      categories: "",
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
      const res = await fetch("/api/products", { method: "POST", body: data });
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            + Switch to Bulk Upload
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  <input
                    type="text"
                    name="productCode"
                    value={formData.productCode}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <span className="text-xs text-gray-500">Auto-generated</span>
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
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
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="weeklyProduct"
                    checked={formData.weeklyProduct}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>Weekly Product</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="flashSaleProduct"
                    checked={formData.flashSaleProduct}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>Flash Sale Product</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="todayDeals"
                    checked={formData.todayDeals}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>Today Deals</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="specialProduct"
                    checked={formData.specialProduct}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>Special Product</span>
                </label>
              </div>
            </div>

            {/* Product Description & Specs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                rows={6}
                placeholder="Enter product description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                name="keySpecifications"
                value={formData.keySpecifications}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter key specifications..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                name="packaging"
                value={formData.packaging}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter packaging details..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                name="warranty"
                value={formData.warranty}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter warranty info..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Pricing & Inventory</h2>
              <input
                type="number"
                name="actualPrice"
                value={formData.actualPrice}
                onChange={handleInputChange}
                placeholder="Actual Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                placeholder="Selling Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="availableQuantity"
                value={formData.availableQuantity}
                onChange={handleInputChange}
                placeholder="Available Quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                placeholder="Stock Quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Product Image & Catalogue</h2>

              <div>
                <input
                  type="file"
                  id="catalog"
                  onChange={(e) => handleFileChange(e, "productCatalog")}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="catalog" className="cursor-pointer flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p>{formData.productCatalog?.name || "Choose file or drag & drop"}</p>
                </label>
              </div>

              <div>
                <input
                  type="file"
                  id="mainImage"
                  onChange={(e) => handleFileChange(e, "mainImage")}
                  className="hidden"
                  accept="image/*"
                />
                <label htmlFor="mainImage" className="cursor-pointer flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p>{formData.mainImage?.name || "Choose image or drag & drop"}</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-end gap-3">
          <button onClick={handleReset} className="px-6 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button onClick={handleSubmit} className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
