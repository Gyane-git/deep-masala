"use client";
import { useState } from "react";
import { Trash2, Plus, X } from "lucide-react";
import Link from "next/link";


export default function AddressBookPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Global Tech",
      type: "Home",
      address: "h, - Kathmandu Metro 1 - Naxal Area -",
      phone: "9813074814",
      isDefaultBilling: true,
      isDefaultShipping: false,
    },
    {
      id: 2,
      name: "Global Tech",
      type: "Home",
      address: "main road, - Kathmandu Metro 10 - New Baneshwor Area -",
      phone: "982121223",
      isDefaultBilling: false,
      isDefaultShipping: false,
    },
    {
      id: 3,
      name: "Global Tech",
      type: "Home",
      address: "temple, - Bhaktapur -",
      phone: "9813074888",
      isDefaultBilling: false,
      isDefaultShipping: true,
    },
    {
      id: 4,
      name: "gyane",
      type: "Home",
      address: "kalimati, - Kathmandu Metro 13 - Kalimati Area -",
      phone: "98212121212",
      isDefaultBilling: false,
      isDefaultShipping: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressType: "Home",
    province: "",
    city: "",
    area: "",
    streetAddress: "",
  });

  // Dropdown data
  const provinces = [
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Province No. 1",
    "Madhesh Province",
    "Karnali Province",
    "Sudurpashchim Province",
  ];

  const cities = {
    "Bagmati Province": [
      "Kathmandu",
      "Bhaktapur",
      "Lalitpur",
      "Kavrepalanchok",
    ],
    "Gandaki Province": ["Pokhara", "Gorkha", "Lamjung"],
    "Lumbini Province": ["Butwal", "Bhairahawa", "Tansen"],
  };

  const areas = {
    Kathmandu: [
      "Naxal Area",
      "New Baneshwor Area",
      "Kalimati Area",
      "Thamel",
      "Baluwatar",
      "Lazimpat",
    ],
    Bhaktapur: ["Durbar Square", "Madhyapur Thimi", "Suryabinayak"],
    Lalitpur: ["Patan", "Jawalakhel", "Pulchowk"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset dependent dropdowns
      ...(name === "province" && { city: "", area: "" }),
      ...(name === "city" && { area: "" }),
    }));
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: addresses.length + 1,
      name: formData.name,
      type: formData.addressType,
      address: `${formData.streetAddress}, - ${formData.city} - ${formData.area} -`,
      phone: formData.phone,
      isDefaultBilling: false,
      isDefaultShipping: false,
    };
    setAddresses([...addresses, newAddress]);
    setShowModal(false);
    setFormData({
      name: "",
      phone: "",
      addressType: "Home",
      province: "",
      city: "",
      area: "",
      streetAddress: "",
    });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setAddresses(addresses.filter((addr) => addr.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const setDefaultShipping = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefaultShipping: addr.id === id,
      }))
    );
  };

  const setDefaultBilling = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefaultBilling: addr.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Address Book</h1>

        {/* Address Cards */}
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-900">Address</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    DELETE
                  </button>
                  <Link className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    href={`/myaccount/address/edit`}>
                    EDIT
                  </Link>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-gray-700">
                  <span className="font-medium">Name:</span> {address.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Address Type:</span>{" "}
                  {address.type}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Address:</span>{" "}
                  {address.address}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> {address.phone}
                </p>
              </div>

              {address.isDefaultBilling && (
                <p className="text-gray-500 text-sm mb-2">
                  Default Billing Address
                </p>
              )}
              {address.isDefaultShipping && (
                <p className="text-gray-500 text-sm mb-2">
                  Default Shipping Address
                </p>
              )}

              <div className="flex flex-wrap gap-3 mt-4">
                {!address.isDefaultShipping && (
                  <button
                    onClick={() => setDefaultShipping(address.id)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    SET AS DEFAULT SHIPPING
                  </button>
                )}
                {!address.isDefaultBilling && (
                  <button
                    onClick={() => setDefaultBilling(address.id)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    SET AS DEFAULT BILLING
                  </button>
                )}

                <div className="flex items-center gap-2">
                    <button
                  onClick={() => setShowModal(true)}
                  className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Add Address
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Address Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Address
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="9813074888"
                />
              </div>

              {/* Address Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type *
                </label>
                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Province */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Province *
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!formData.province}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select City</option>
                  {formData.province &&
                    cities[formData.province]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area *
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  disabled={!formData.city}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select Area</option>
                  {formData.city &&
                    areas[formData.city]?.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                </select>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <textarea
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="House/Building number, Street name, Landmark"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Delete Address
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this address? This action cannot
              be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
