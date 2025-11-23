"use client";
import { useEffect, useState } from "react";

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
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`/api/banner/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      alert("Banner removed");
      fetchBanners();
    } else {
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Banner List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="rounded-xl border p-3 shadow-md bg-white"
          >
            <img
              src={banner.image_path}
              className="w-full h-40 object-cover rounded-lg"
              alt={banner.banner_name}
            />

            <h2 className="mt-2 font-semibold">{banner.banner_name}</h2>

            <button
              onClick={() => deleteBanner(banner.id)}
              className="mt-2 w-full bg-red-600 text-white py-1.5 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
