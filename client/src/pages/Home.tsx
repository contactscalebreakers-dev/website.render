import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import GlitchTitle from "@/components/GlitchTitle";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white py-24 md:py-40">
        {/* Background distortion effect */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Title */}
            <div className="mb-8">
              <GlitchTitle as="h1" className="hero-title text-6xl md:text-8xl lg:text-9xl font-black text-black mb-2 leading-none">
                Scale Breakers.
              </GlitchTitle>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto mb-8"></div>
            </div>

            {/* Slogan */}
            <p className="hero-slogan text-lg md:text-2xl lg:text-3xl text-gray-700 mb-6 font-light">
              Break The Mold. Make Art.
            </p>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Urban art & mural commissions. Collectible 3D art & figurines. Creative workshops for all ages and abilities in Brisbane.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workshops">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-base">
                  Explore Workshops <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-gray-900 font-bold text-base hover:bg-gray-50">
                  Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tiles Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Workshops Tile */}
            <Link href="/workshops">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 cursor-pointer hover:shadow-lg transition h-full">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold mb-3">Workshops</h3>
                <p className="text-gray-700 mb-6">
                  Creative programs for all ages. Street art, 3D design, character creation, and more.
                </p>
                <span className="text-blue-600 font-bold flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Products Tile */}
            <Link href="/products">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 cursor-pointer hover:shadow-lg transition h-full">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-2xl font-bold mb-3">Products</h3>
                <p className="text-gray-700 mb-6">
                  Collectible figurines, urban dioramas, and original artwork. Unique pieces for collectors.
                </p>
                <span className="text-purple-600 font-bold flex items-center gap-2">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Services Tile */}
            <Link href="/services">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-8 cursor-pointer hover:shadow-lg transition h-full">
                <div className="text-4xl mb-4">🖌️</div>
                <h3 className="text-2xl font-bold mb-3">Services</h3>
                <p className="text-gray-700 mb-6">
                  Mural commissions, 3D scanning, digital modelling, and custom projects for businesses and creators.
                </p>
                <span className="text-pink-600 font-bold flex items-center gap-2">
                  Get Quote <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Workshop Showcase Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Workshop Highlights</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Animorphic character design and hands-on creative workshops in action
            </p>
            
              <div className="flex justify-center">
                <div className="w-full max-w-md aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/Fb95uqE8BVQ"
                    title="Workshop Highlights Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* 3D Scanning & Digital Modelling Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Our Services</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            High-fidelity 3D scanning and digital modelling for your creative projects
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Video 1 */}
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <video
                src="/3D Scan Wall3.webm"
                autoPlay
                loop
                muted
                playsInline
                poster="/portfolio-hithere.webp"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Video 2 */}
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <video
                src="/3D Scan 2.webm"
                autoPlay
                loop
                muted
                playsInline
                poster="/portfolio-media.webp"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Video 3 */}
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <video
                src="/3D scan wall1.webm"
                autoPlay
                loop
                muted
                playsInline
                poster="/portfolio-street-art.webp"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section (Text Only) */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Selected Work</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Murals */}
            <div>
              <h3 className="text-xl font-bold mb-6">Murals & Urban Art</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/about">
                    <span className="text-blue-600 hover:underline font-semibold">Brisbane CBD Street Art Series</span>
                  </Link>
                  <p className="text-gray-600 text-sm">Large-scale murals featuring local culture and community themes</p>
                </li>
                <li>
                  <Link href="/about">
                    <span className="text-blue-600 hover:underline font-semibold">Community Engagement Murals</span>
                  </Link>
                  <p className="text-gray-600 text-sm">Collaborative public art projects with councils and organizations</p>
                </li>
                <li>
                  <Link href="/about">
                    <span className="text-blue-600 hover:underline font-semibold">Business & Commercial Murals</span>
                  </Link>
                  <p className="text-gray-600 text-sm">Custom murals for storefronts and commercial spaces</p>
                </li>
              </ul>
            </div>

            {/* 3D & Products */}
            <div>
              <h3 className="text-xl font-bold mb-6">3D Art & Collectibles</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/products">
                    <span className="text-blue-600 hover:underline font-semibold">Collectible Figurine Series</span>
                  </Link>
                  <p className="text-gray-600 text-sm">Custom-designed toys and figurines for collectors</p>
                </li>
                <li>
                  <Link href="/products">
                    <span className="text-blue-600 hover:underline font-semibold">Urban Dioramas</span>
                  </Link>
                  <p className="text-gray-600 text-sm">Detailed miniature street scenes with hand-painted details</p>
                </li>
                <li>
                  <Link href="/services">
                    <span className="text-blue-600 hover:underline font-semibold">3D Scanning & Modelling</span>
                  </Link>
                  <p className="text-gray-600 text-sm">High-fidelity 3D scans and digital models for projects</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
