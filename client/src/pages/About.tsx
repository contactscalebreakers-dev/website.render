// This file has been removed as it is unused.
import GlitchTitle from "@/components/GlitchTitle";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <GlitchTitle as="h1" className="text-4xl md:text-5xl font-bold mb-6">About Scale Breakers</GlitchTitle>
          <p className="text-lg text-gray-600 max-w-2xl">
            Creating bold, vibrant art that breaks boundaries and inspires communities across Brisbane.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p>
              Scale Breakers is an independent creative practice focused on urban art, 3D design, and community-engaged workshops. We work with individuals, businesses, councils, schools, and community organizations to create meaningful visual experiences.
            </p>
            <p>
              Our practice spans three core areas: custom mural commissions for businesses and communities, collectible 3D art and figurines, and creative workshops that build confidence, skills, and social connection.
            </p>
            <p>
              We believe in breaking the mold. Every project is approached with authenticity, attention to detail, and a commitment to supporting the creative goals of our collaborators.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Urban Art & Murals</h3>
              <p className="text-gray-600 text-sm">
                Custom mural commissions for businesses, councils, homes, and studios. Large-scale street art that transforms spaces and engages communities.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">3D Art & Collectibles</h3>
              <p className="text-gray-600 text-sm">
                Collectible figurines, dioramas, and original artwork. 3D scanning, sculpting, character design, and digital services for creators and brands.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Creative Workshops</h3>
              <p className="text-gray-600 text-sm">
                Hands-on programs for all ages and abilities. Public workshops, NDIS-friendly sessions, and tailored programs for schools and councils.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Portfolio</h2>
          
          {/* Murals & Urban Art */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8">Murals & Urban Art</h3>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">Brisbane CBD Street Art Series</h4>
                <p className="text-gray-600">
                  Large-scale murals featuring local culture, community themes, and urban aesthetics across Brisbane's central business district.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">Community Engagement Murals</h4>
                <p className="text-gray-600">
                  Collaborative mural projects with councils and community organizations, bringing neighborhoods together through public art.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">Business & Commercial Murals</h4>
                <p className="text-gray-600">
                  Custom murals for storefronts, offices, and commercial spaces that boost brand identity and curb appeal.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">Residential & Studio Commissions</h4>
                <p className="text-gray-600">
                  Personal creative spaces and gallery walls for collectors and artists seeking unique, custom artwork.
                </p>
              </div>
            </div>
          </div>

          {/* 3D / Toys / Dioramas */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8">3D Art, Toys & Dioramas</h3>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">Collectible Figurine Series</h4>
                <p className="text-gray-600">
                  Custom-designed and produced collectible toys and figurines for independent creators, brands, and collectors.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">Urban Dioramas</h4>
                <p className="text-gray-600">
                  Detailed miniature street scenes and dioramas combining 3D models, hand-painted details, and street art elements.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">3D Scanning & Modelling</h4>
                <p className="text-gray-600">
                  High-fidelity 3D scans and digital models for product design, animation, AR/VR experiences, and digital fabrication.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">Character Design & Animation</h4>
                <p className="text-gray-600">
                  Original character design, 3D sculpting, and animation services for games, media, and interactive projects.
                </p>
              </div>
            </div>
          </div>

          {/* Workshops & Programs */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Workshops & Creative Programs</h3>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">Public Creative Workshops</h4>
                <p className="text-gray-600">
                  Hands-on programs in street art, character design, 3D modeling, and upcycling. Open to all ages and skill levels.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">NDIS-Friendly Creative Sessions</h4>
                <p className="text-gray-600">
                  Tailored workshops for NDIS participants supporting goals around social participation, skills development, and community access.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">School & Youth Programs</h4>
                <p className="text-gray-600">
                  Custom creative programs for schools, youth organizations, and councils focusing on engagement, confidence, and artistic skills.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-2">Community & Council Collaborations</h4>
                <p className="text-gray-600">
                  Large-scale workshop programs and public art initiatives developed in partnership with local councils and community groups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-2xl font-bold text-blue-600 flex-shrink-0">✓</div>
              <div>
                <h4 className="font-bold text-lg mb-2">Authenticity</h4>
                <p className="text-gray-600">We create work that's genuine, thoughtful, and grounded in real artistic practice.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl font-bold text-blue-600 flex-shrink-0">✓</div>
              <div>
                <h4 className="font-bold text-lg mb-2">Community Focus</h4>
                <p className="text-gray-600">We believe in the power of creative practice to build connection, confidence, and belonging.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl font-bold text-blue-600 flex-shrink-0">✓</div>
              <div>
                <h4 className="font-bold text-lg mb-2">Accessibility</h4>
                <p className="text-gray-600">Creative practice should be open to everyone. We design inclusive workshops and accessible services.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl font-bold text-blue-600 flex-shrink-0">✓</div>
              <div>
                <h4 className="font-bold text-lg mb-2">Quality & Detail</h4>
                <p className="text-gray-600">Every project receives careful attention and professional execution, no matter the scale.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
