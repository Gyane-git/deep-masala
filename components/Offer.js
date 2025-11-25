"use client";
import React, { useState, useEffect } from "react";
import { Gift, X, ChevronLeft, ChevronRight } from "lucide-react";

const PromoBannerSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch("/api/popup-ads");
      const data = await res.json();

      const formatted = data.map((item) => ({
        icon: <Gift className="w-6 h-6" />,
        text: item.title,
        color: item.color || "#000000",
      }));

      setSlides(formatted);
    } catch (err) {
      console.error("Failed to fetch slider ads:", err);
    }
  };

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!isVisible || slides.length === 0) return null;

  return (
    <div
      className="text-white py-3 px-4 relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: slides[currentSlide].color }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Navigation */}
        <button
          onClick={prevSlide}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex items-center justify-center gap-3 flex-1">
          <div className="shrink-0">{slides[currentSlide].icon}</div>

          <p className="text-sm md:text-base font-medium text-center">
            {slides[currentSlide].text}
          </p>
        </div>

        {/* Right Navigation + Close */}
        <div className="flex items-center gap-4">
          <button
            onClick={nextSlide}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              currentSlide === index ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBannerSlider;
