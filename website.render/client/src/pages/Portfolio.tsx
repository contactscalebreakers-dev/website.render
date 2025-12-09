import GlitchTitle from "@/components/GlitchTitle";
import { trpc } from "@/lib/trpc";
import { Loader } from "lucide-react";

export default function Portfolio() {
  const { data: products, isLoading } = trpc.products.list.useQuery({});

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

            {/* Temporarily hidden until real images are available */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
              <p className="text-gray-500 text-lg">Mural images coming soon</p>
            </div>

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
            ) : products && products.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    {product.imageUrl && (
                      <div className="relative overflow-hidden bg-gray-100 aspect-square">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          SOLD
                        </div>
                        {product.isOneOfOne === "true" && (
                          <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                            ✦ 1/1
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                      {product.description && (
                        <p className="text-gray-600 text-sm">
                          {product.description}
                        </p>
                      )}
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

      {/* Workshop Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Workshop Highlights</h2>
            <p className="text-gray-600 text-lg mb-12">
              Student creations from creative workshops across Brisbane.
            </p>

            {/* Temporarily hidden until real images are available */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
              <p className="text-gray-500 text-lg">Workshop images coming soon</p>
            </div>

            <div className="space-y-3 text-gray-700">
              <p><strong>Street Art Foundations</strong> — Student pieces from graffiti and stencil workshops</p>
              <p><strong>3D Diorama Projects</strong> — Miniature urban scenes created by participants</p>
              <p><strong>Character Design Sessions</strong> — Original creations from beginner and advanced workshops</p>
              <p><strong>NDIS Program Outcomes</strong> — Artwork and projects from supported creative sessions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}