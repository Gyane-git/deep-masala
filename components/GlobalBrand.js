"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  if (categories.length === 0) return <p className="text-center mt-10">Loading categories...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white">
              {cat.image ? (
                <img
                  src={cat.image} // e.g., "/categories/abc.png"
                  alt={cat.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{cat.name}</h3>
                <p className="text-gray-500 text-sm">{cat.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
