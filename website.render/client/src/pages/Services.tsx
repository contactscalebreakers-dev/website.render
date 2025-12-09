import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";

export default function Services() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <GlitchTitle as="h1" className="text-5xl md:text-6xl font-black mb-6">Services</GlitchTitle>
          <p className="text-lg text-gray-600 max-w-2xl">
            Scale Breakers offers specialized creative services to bring your vision to life. Explore our offerings below.
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Mural Art Card */}
            <div className="bg-white border-2 border-gray-300 rounded-xl p-10 hover:border-pink-600 hover:shadow-2xl transition">
              <div className="bg-pink-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">🎨</span>
              </div>
              <GlitchTitle as="h2" className="text-3xl font-black mb-4">Mural Art</GlitchTitle>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Transform spaces with custom street art and large-scale murals. Professional design and execution for businesses, councils, and community spaces.
              </p>
              <Link href="/services/murals">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white font-bold flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* 3D Scanning Card */}
            <div className="bg-white border-2 border-gray-300 rounded-xl p-10 hover:border-blue-600 hover:shadow-2xl transition">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">📐</span>
              </div>
              <GlitchTitle as="h2" className="text-3xl font-black mb-4">3D Scanning</GlitchTitle>
              <p className="text-gray-600 mb-8 leading-relaxed">
                High-precision photogrammetry scans of walls, textures, and objects for animation, 3D printing, AR, and digital workflows.
              </p>
              <Link href="/services/3d-scanning">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* 3D Modelling Card */}
            <div className="bg-white border-2 border-gray-300 rounded-xl p-10 hover:border-purple-600 hover:shadow-2xl transition">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">🎮</span>
              </div>
              <GlitchTitle as="h2" className="text-3xl font-black mb-4">3D Modelling</GlitchTitle>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Custom 3D models from scratch for games, animation, products, and digital projects. Character design to architectural visualization.
              </p>
              <Link href="/services/3d-modelling">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 text-lg">
              Need something custom? <a href="mailto:contact.scalebreakers@gmail.com" className="text-blue-600 font-bold hover:underline">Contact us</a> for custom orders.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

