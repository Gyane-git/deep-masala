"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/banner");
        const data = await res.json();
        if (data.success && data.banners.length > 0) {
          const bannerImages = data.banners.map((banner) => banner.image_path);
          setSlides(bannerImages);
        }
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      }
    };
    fetchBanners();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const products = [
    {
      title: "BLENDED SPICES",
      description:
        "Nothing can beat the delicious taste of traditional Indian spice blends! Deep's range of blended spices are hand-crafted & the ingredients are sourced from India's renowned spice lands, ensuring the taste, aroma, flavour & color remain uncompromised.",
      image: "/images/product/Aloo-Sabji-Masala-01-1.png.webp",
      imagePosition: "left",
    },
    {
      title: "PURE SPICES",
      description:
        "Pure spices play an integral part in Indian cuisine irrespective of the zone, state, community or the cooking method and hence occupy a very special place of honor. We, at Deep, believe in offering spices that are rich & authentic. And nothing more speaks of this belief than our range of Pure Spices.",
      image: "/images/product/Frame-3.png.webp",
      imagePosition: "right",
    },
    {
      title: "ASAFOETIDA",
      description:
        "Add some 'zing to tastes' to your dishes! Rich, strong and soothing Deep Hingraj Powder is made using spices of the highest quality sourced only from the best of farms. We have maintained the highest level of purity, freshness and authenticity in every piece, getting their aroma and flavour consistently right.",
      image: "/images/product/Frame-4.png.webp",
      imagePosition: "left",
    },
    {
      title: "EXOTIC RANGE",
      description:
        "Pure, premium, and exotic, Deep's Kesar Milk Masala and Saffron are must-haves for all the traditional and mouth-watering shahi Indian feasts. Deep Saffron & Kesar Milk Masala have a subtle & earthy flavour & an unmistakable scent that makes it a special spice.",
      image: "/images/product/front-3.png.webp",
      imagePosition: "right",
    },
    {
      title: "PASTE",
      description:
        "Ginger Garlic paste that tastes fresh & delicious just like the homemade one. Made using finest of the gingers and garlics, this blended delight is a must-have for food preparation.",
      image: "/images/product/front-4.png.webp",
      imagePosition: "left",
    },
    {
      title: "TASTEETO",
      description:
        "Introducing Tasteeto, a range of herbs and seasonings to infuse your meals with lip-smacking flavour and archaroma tastic! Pick your cuisine, grab a bottle of Tasteeto, and let the feasting begin!",
      image: "/images/product/Chilli-Flakes-01-1.png.webp",
      imagePosition: "right",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Slider Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={index === currentSlide ? "false" : "true"}
          >
            <Image
              src={slide}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-20"
        >
          <ChevronLeft size={32} className="text-orange-600" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-20"
        >
          <ChevronRight size={32} className="text-orange-600" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-3 rounded-full transition-all flex items-center justify-center ${
                index === currentSlide
                  ? "bg-orange-600 px-2 w-8"
                  : "bg-white/60 w-3"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full h-48 md:h-64">
                <Image
                  src="/images/product/Raita-Dahivada-Masala-01.png.webp"
                  alt="About image 1"
                  fill
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="relative w-full h-48 md:h-64">
                <Image
                  src="/images/product/sabji-masala.png.webp"
                  alt="About image 2"
                  fill
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <span className="bg-red-600 text-white px-2 py-1 font-semibold">
                  At Deep, spice bhejo
                </span>{" "}
                has an ingredient... But an emotion! It evokes the joy of
                festive feasts, the warmth of family recipes, and the love that
                binds generations. From farm to kitchen, every spice is woven
                into the fabric of our culinary culture.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <span className="bg-red-600 text-white px-2 py-1 font-semibold">
                  At Deep
                </span>
                , magic – created by global flavours, meet the new{" "}
                <span className="bg-yellow-400 text-gray-900 px-2 py-1 font-semibold">
                  Tasteeto range
                </span>
                – crafted for quick, delicious everyday cooking, we are here to
                make every dish effortlessly flavourful. Deep is not just
                about spices: its about seasoning lives with taste and
                tradition.
              </p>
              <button className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Products You Will Love
          </h2>

          {products.map((product, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-12 items-center mb-24 ${
                index % 2 === 0 ? "" : "md:grid-flow-dense"
              }`}
            >
              <div
                className={`relative w-full h-64 md:h-96 ${
                  product.imagePosition === "right" ? "md:col-start-2" : ""
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg shadow-md"
                />
              </div>

              <div
                className={`${
                  product.imagePosition === "right"
                    ? "md:col-start-1 md:row-start-1"
                    : ""
                }`}
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {product.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>
                <button className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors font-semibold">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
