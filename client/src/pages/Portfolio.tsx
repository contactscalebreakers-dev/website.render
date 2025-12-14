import GlitchTitle from "@/components/GlitchTitle";
import { Loader } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Portfolio() {
  const { data: portfolio, isLoading, error } = trpc.portfolio.list.useQuery();

  if (error) {
    console.error("Portfolio query error:", error);
  }

  const murals = portfolio?.filter(item => item.category === "mural") || [];
  const designs = portfolio?.filter(item => item.category === "3d-model") || [];
  const artworks = portfolio?.filter(item => item.category === "canvas" || item.category === "portrait") || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <GlitchTitle as="h1" className="text-5xl md:text-6xl font-black mb-6">
            Portfolio
          </GlitchTitle>
          <p className="text-xl text-gray-700 max-w-3xl">
            Work by Scale Breakers across Brisbane and beyond.
          </p>
        </div>
      </section>

      {/* Street Art & Murals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Street Art & Murals</h2>
            <p className="text-gray-600 text-lg mb-12">
              Large-scale commissions for businesses, councils, and community spaces across Brisbane.
            </p>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-8">
                <p className="text-red-600 font-semibold mb-2">Error loading portfolio</p>
                <p className="text-red-500 text-sm">{error.message}</p>
              </div>
            ) : murals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {murals.map((item) => (
                  <div key={item.id} className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover" />
                    )}
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
                <p className="text-gray-500 text-lg">Mural images coming soon</p>
              </div>
            )}

            <div className="space-y-3 text-gray-700">
              <p><strong>Brisbane CBD Street Art Series</strong> — Large-scale murals featuring local culture and community themes</p>
              <p><strong>Community Engagement Projects</strong> — Collaborative public art with councils and organizations</p>
              <p><strong>Business & Commercial Murals</strong> — Custom murals for storefronts, offices, and commercial spaces</p>
              <p><strong>Residential Commissions</strong> — Personal creative spaces and gallery walls</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Art & Collectibles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">3D Art & Collectibles</h2>
            <p className="text-gray-600 text-lg mb-12">
              Character designs, collectible figurines, urban dioramas, and experimental digital work.
            </p>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : designs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {designs.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    {item.imageUrl && (
                      <div className="relative overflow-hidden bg-gray-100 aspect-square">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
                <p className="text-gray-500 text-lg">3D work images coming soon</p>
              </div>
            )}

            <div className="space-y-3 text-gray-700">
              <p><strong>Animorphic Hybrid Characters</strong> — Stylized urban creature designs with street aesthetics</p>
              <p><strong>Collectible Figurines</strong> — Custom-designed toys and figures for independent creators and collectors</p>
              <p><strong>Urban Dioramas</strong> — Miniature street scenes combining 3D models and hand-painted details</p>
              <p><strong>Digital Renders</strong> — Character design and experimental 3D work</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artwork & Paintings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Artwork & Paintings</h2>
            <p className="text-gray-600 text-lg mb-12">
              Original artwork, paintings, and sketchbook pieces.
            </p>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-8">
                <p className="text-red-600 font-semibold mb-2">Error loading portfolio</p>
                <p className="text-red-500 text-sm">{error.message}</p>
              </div>
            ) : artworks.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {artworks.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    {item.imageUrl && (
                      <div className="relative overflow-hidden bg-gray-100 aspect-square">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
                <p className="text-gray-500 text-lg">Artwork images coming soon</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
