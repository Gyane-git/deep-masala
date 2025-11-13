"use client";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    'Chicken Masala',
    'Momo Masala',
    'Meat Masala',
    'Chhole Masala',
    'Garam Masala',
    'Red Chilli Powder'
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Products', href: '/products' },
    { name: 'Quality Certification', href: '/certifications' },
    { name: 'Buy Online', href: '/shop' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Customer Feedback', href: '/feedback' }
  ];

  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-br from-orange-500 to-red-600 rounded-full p-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
              </div>
              <div>
                <h2 className="text-white text-xl font-bold">Mitho Masala</h2>
                <p className="text-orange-400 text-xs">Pure Taste. Real Tradition.</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Bringing authentic Nepali flavors to your kitchen. Made with love, sealed with quality.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="bg-gray-800 hover:bg-orange-600 p-2 rounded-full transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 hover:bg-orange-600 p-2 rounded-full transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 hover:bg-orange-600 p-2 rounded-full transition-colors duration-200">
                <Youtube size={20} />
              </a>
              <a href="https://wa.me/977" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 hover:bg-green-600 p-2 rounded-full transition-colors duration-200">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Our Products */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 border-b-2 border-orange-600 inline-block pb-2">
              Our Products
            </h3>
            <ul className="space-y-2">
              {productLinks.map((product, index) => (
                <li key={index}>
                  <a href="/products" className="text-sm hover:text-orange-400 transition-colors flex items-center">
                    <span className="text-orange-500 mr-2">▸</span>
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 border-b-2 border-orange-600 inline-block pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm hover:text-orange-400 transition-colors flex items-center">
                    <span className="text-orange-500 mr-2">▸</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 border-b-2 border-orange-600 inline-block pb-2">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-orange-500 flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-semibold text-white">Factory Address</p>
                  <p>Sakhuawa</p>
                  <p>Rautahat, Nepal</p>
                  
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-orange-500 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-white">Phone</p>
                  <a href="tel:+977" className="hover:text-orange-400">+977-XXX-XXXXXXX</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-orange-500 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-white">Email</p>
                  <a href="mailto:info@yourbrand.com.np" className="hover:text-orange-400">
                    info@yourbrand.com.np
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Banner */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400">
            <span className="flex items-center space-x-2">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full font-semibold">DFTQC</span>
              <span>Certified</span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center space-x-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">ISO</span>
              <span>Quality Assured</span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center space-x-2">
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full font-semibold">100%</span>
              <span>Pure & Natural</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-black">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {currentYear} Your Brand Name. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-500 hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-orange-400 transition-colors">
                Terms & Conditions
              </a>
              <a href="/refund" className="text-gray-500 hover:text-orange-400 transition-colors">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}