import { Link } from "wouter";

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="font-bold text-lg mb-4">Scale Breakers</h2>
            <p className="text-gray-400 text-sm">ABN 12 345 678 901</p>
            <p className="text-gray-400 text-sm mt-2">Break the mold. Make art.</p>
          </div>
          <nav aria-label="Explore links">
            <h2 className="font-bold mb-4">Explore</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/workshops" className="hover:text-white transition inline-block py-1">Workshops</Link></li>
              <li><Link href="/products" className="hover:text-white transition inline-block py-1">Shop</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition inline-block py-1">Portfolio</Link></li>
              <li><Link href="/services" className="hover:text-white transition inline-block py-1">Services</Link></li>
            </ul>
          </nav>
          <nav aria-label="Services links">
            <h2 className="font-bold mb-4">Services</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services/murals" className="hover:text-white transition inline-block py-1">Mural Commissions</Link></li>
              <li><Link href="/services/3d-scanning" className="hover:text-white transition inline-block py-1">3D Scanning</Link></li>
              <li><Link href="/services/3d-modelling" className="hover:text-white transition inline-block py-1">3D Modelling</Link></li>
            </ul>
          </nav>
          <div>
            <h2 className="font-bold mb-4">Connect</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://instagram.com/scale.breakers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-block py-1" aria-label="Follow us on Instagram">Instagram</a></li>
              <li><a href="https://www.facebook.com/TheScaleBreakers/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-block py-1" aria-label="Follow us on Facebook">Facebook</a></li>
              <li><a href="mailto:contact.scalebreakers@gmail.com" className="hover:text-white transition inline-block py-1" aria-label="Email us">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Scale Breakers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
