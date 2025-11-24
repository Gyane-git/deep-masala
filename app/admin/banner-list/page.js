"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function BannerList() {
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    const res = await fetch("/api/banner");
    const data = await res.json();
    if (data.success) {
      setBanners(data.banners);
    }
  };

  const deleteBanner = async (id) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    const res = await fetch(`/api/banner/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      alert("Banner removed successfully");
      fetchBanners();
    } else {
      alert("Failed to delete banner");
    }
  };

  const handleEdit = (id) => {
    // Add your edit logic here
    console.log("Edit banner:", id);
  };

  const handleInfo = (id) => {
    // Add your info/view logic here
    console.log("View banner info:", id);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBanners();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Banner Management</h1>
        <p className="text-gray-600 mt-1">Manage your banner collection</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {banners.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No banners available
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="flex items-center p-4 hover:bg-gray-50 transition-colors"
              >
                {/* Banner Image */}
                <div className="shrink-0 w-32 h-20 mr-4">
                  <Image
                    src={banner.image_path}
                    alt={banner.banner_name}
                    width={128}
                    height={80}
                    className="w-full h-full object-cover rounded-md border border-gray-200"
                  />
                </div>

                {/* Banner Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {banner.banner_name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ID: {banner.id}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleInfo(banner.id)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                    title="View Info"
                  >
                    Info
                  </button>
                  <button
                    onClick={() => handleEdit(banner.id)}
                    className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                    title="Edit Banner"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBanner(banner.id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                    title="Delete Banner"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}