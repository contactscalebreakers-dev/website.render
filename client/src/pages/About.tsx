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
