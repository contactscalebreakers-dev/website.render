import { Link } from "wouter";
import { Menu, X, Instagram, Facebook, Mail, ChevronDown, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Workshops", href: "/workshops" },
    { label: "Shop", href: "/products" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ];

  const servicesItems = [
    { label: "Mural Art", href: "/services/murals" },
    { label: "3D Scanning", href: "/services/3d-scanning" },
    { label: "3D Modelling", href: "/services/3d-modelling" },
  ];

  return (
    <header role="banner" className="sticky top-0 z-50 bg-white border-b-2 border-gray-900 shadow-lg">
      <nav aria-label="Main navigation" className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Scale Breakers - Home">
          <img src="/logo-main.png" alt="Scale Breakers logo" className="h-12 w-auto hover:scale-105 transition" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {/* Home */}
          <Link href="/" className="relative group">
            <span className="text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 transition">
              Home
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Workshops */}
          <Link href="/workshops" className="relative group">
            <span className="text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 transition">
              Workshops
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Shop */}
          <Link href="/products" className="relative group">
            <span className="text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 transition">
              Shop
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Services Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 transition flex items-center gap-1">
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isServicesOpen && (
              <div className="absolute left-0 mt-0 w-48 bg-white border-2 border-gray-900 shadow-lg rounded-lg py-2 z-50">
                {servicesItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm font-bold text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Portfolio */}
          <Link href="/portfolio" className="relative group">
            <span className="text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 transition">
              Portfolio
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Contact */}
          <Link href="/contact" className="relative group">
            <span className="text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 transition">
              Contact
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Social Links */}
        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="https://instagram.com/scale.breakers" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 hover:text-blue-600 transition"
            title="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="https://www.facebook.com/TheScaleBreakers/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 hover:text-blue-600 transition"
            title="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a 
            href="mailto:contact.scalebreakers@gmail.com" 
            className="text-gray-700 hover:text-blue-600 transition"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Cart + Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition min-w-[44px] min-h-[44px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t-2 border-gray-900 p-6 space-y-4">
          {/* Home */}
          <Link 
            href="/" 
            className="block text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {/* Workshops */}
          <Link 
            href="/workshops" 
            className="block text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Workshops
          </Link>

          {/* Shop */}
          <Link 
            href="/products" 
            className="block text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>

          {/* Mobile Services Dropdown */}
          <div>
            <button 
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="w-full text-left text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition flex items-center justify-between"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isServicesOpen && (
              <div className="pl-4 space-y-2 mt-2">
                {servicesItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="block text-sm font-bold text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Portfolio */}
          <Link 
            href="/portfolio" 
            className="block text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>

          {/* Contact */}
          <Link 
            href="/contact" 
            className="block text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          
          <div className="pt-4 border-t-2 border-gray-200">
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/scale.breakers" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-blue-600 transition"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/TheScaleBreakers/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-blue-600 transition"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact.scalebreakers@gmail.com" 
                className="text-gray-700 hover:text-blue-600 transition"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
