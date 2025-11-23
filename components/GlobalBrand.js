"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const brands = [
  {
    id: 1,
    image: "/images/brand/Frame-39.png.webp", // replace with your image path
    title: "Hottest Pairs",
    offer: "MIN. 30% OFF",
    logo: "Dorothy Perkins | Boohoo",
  },
  {
    id: 2,
    image: "/images/brand/Frame-39.png (1).webp",
    title: "Stunning Footwear",
    offer: "UP TO 60% OFF",
    logo: "Mango",
  },
  {
    id: 3,
    image: "/images/brand/Eszychef-Category-Image.png.webp",
    title: "Sneakers & More",
    offer: "MIN. 40% OFF",
    logo: "ALDO",
  },
  {
    id: 4,
    image: "/images/brand/Frame-40.png.webp",
    title: "Must-Have Collection",
    offer: "UP TO 50% OFF",
    logo: "Calvin Klein",
  },
  {
    id: 5,
    image: "/images/brand/Frame-49.png.webp",
    title: "Laid-Back Styles",
    offer: "MIN. 30% OFF",
    logo: "GANT",
  },
  {
    id: 6,
    image: "/images/brand/Frame-50.png.webp",
    title: "Laid-Back Styles",
    offer: "MIN. 30% OFF",
    logo: "GANT",
  },
  {
    id: 7,
    image: "/images/brand/Frame-57.png.webp",
    title: "Laid-Back Styles",
    offer: "MIN. 30% OFF",
    logo: "GANT",
  },
  
];

export default function GlobalBrandsSlider() {
  return (
    <div className="max-w-7xl mx-auto py-10 ">
    
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
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white">
              <Image
                src={brand.image}
                alt={brand.title}
                width={500}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">{brand.logo}</p>
                <h3 className="text-lg font-semibold">{brand.title}</h3>
                <p className="text-red-500 font-bold">{brand.offer}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
