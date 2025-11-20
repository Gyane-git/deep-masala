"use client";
import { useState, useEffect } from "react";
import { Menu, X, LogInIcon, UserCog } from "lucide-react";
import Image from "next/image";
import PromoBannerSlider from "./Offer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Fake auth check (replace with real logic)
  useEffect(() => {
    const user = localStorage.getItem("auth");
    setIsLoggedIn(!!user);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Combo", href: "/combo" },
    { name: "Contact", href: "/contact" },
    { name: "Business", href: "/business/account" },
  ];

  return (
    <>
      <PromoBannerSlider />

      <header className="sticky top-0 z-50 w-full bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="w-40 flex items-center justify-center">
              <Image
                src="/images/logo1.png"
                alt="Logo"
                width={60}
                height={60}
                className="object-cover"
              />
            </Link>

            {/* Center Nav */}
            <nav className="hidden md:flex items-center space-x-8 mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 font-medium hover:text-orange-500 transition"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <button
                  onClick={() => router.push("/account/login")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
                >
                  <LogInIcon size={18} /> Login
                </button>
              ) : (
                <button
                  onClick={() => router.push("/myaccount")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-900 transition"
                >
                  <UserCog size={18} /> My Account
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-md rounded-lg p-4 space-y-4 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-800 font-medium hover:text-orange-500 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/account/login");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
                >
                  <LogInIcon size={18} /> Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/myaccount");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-900 transition"
                >
                  <UserCog size={18} /> My Account
                </button>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
