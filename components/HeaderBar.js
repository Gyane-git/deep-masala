"use client";
import { useState } from 'react';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import Image from 'next/image';
import PromoBannerSlider from './Offer';
import Link from 'next/link';
export default function HeaderBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const navLinks = [
   
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Combo', href: '/combo' },
    { name: 'Contact', href: '/contact' },
    { name: 'Business', href: '/business/account' },
    
  ];

  return (
    <>
    <PromoBannerSlider />
    
    <header className="sticky top-0 z-50 w-full bg-transparent shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className=" ">
<Link href="/" className="w-40 h-15 overflow-hidden flex items-center justify-center">
  <Image
    src="/images/logo1.png"
    alt="Logo"
    width={60}
    height={60}
    className="object-cover w-full h-full"
  />
</Link>     </div>
            {/* <div className="text-white">
              <h1 className="text-2xl font-bold tracking-tight">Deep Masala</h1>
              <p className="text-xs text-orange-100">Pure Taste. Real Tradition.</p>
            </div> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-yellow-200 transition-colors duration-200 font-medium text-sm uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Section - Cart & Contact */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+977"
              className="flex items-center space-x-2 bg-white text-orange-600 px-4 py-2 rounded-full hover:bg-yellow-100 transition-all duration-200 font-semibold"
            >
              <Phone size={16} />
              <span className="text-sm">Call Us</span>
            </a>
            <button className="relative bg-white text-orange-600 p-3 rounded-full hover:bg-yellow-100 transition-all duration-200 shadow-md">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-orange-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-orange-500 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-orange-800 rounded-lg my-2 shadow-xl animate-in slide-in-from-top">
            <nav className="flex flex-col space-y-1 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:bg-orange-700 px-4 py-3 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="border-t border-orange-600 my-2"></div>
              <a
                href="tel:+977"
                className="flex items-center space-x-2 bg-white text-orange-600 px-4 py-3 rounded-lg hover:bg-yellow-100 transition-all font-semibold justify-center"
              >
                <Phone size={18} />
                <span>Call Us</span>
              </a>
              <button className="flex items-center justify-center space-x-2 bg-yellow-400 text-orange-800 px-4 py-3 rounded-lg hover:bg-yellow-300 transition-all font-semibold">
                <ShoppingCart size={18} />
                <span>Cart (0)</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
}