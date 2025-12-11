import { Link } from "wouter";

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">Scale Breakers</h4>
            <p className="text-gray-400 text-sm">ABN 12 345 678 901</p>
            <p className="text-gray-400 text-sm mt-2">Break the mold. Make art.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/workshops"><span className="hover:text-white transition">Workshops</span></Link></li>
              <li><Link href="/products"><span className="hover:text-white transition">Shop</span></Link></li>
              <li><Link href="/portfolio"><span className="hover:text-white transition">Portfolio</span></Link></li>
              <li><Link href="/services"><span className="hover:text-white transition">Services</span></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services/murals"><span className="hover:text-white transition">Mural Commissions</span></Link></li>
              <li><Link href="/services/3d-scanning"><span className="hover:text-white transition">3D Scanning</span></Link></li>
              <li><Link href="/services/3d-modelling"><span className="hover:text-white transition">3D Modelling</span></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://instagram.com/scale.breakers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
              <li><a href="https://www.facebook.com/TheScaleBreakers/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Facebook</a></li>
              <li><a href="mailto:contact.scalebreakers@gmail.com" className="hover:text-white transition">Email</a></li>
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
