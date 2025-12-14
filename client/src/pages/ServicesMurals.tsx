import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import GlitchTitle from "@/components/GlitchTitle";
import { DollarSign } from "lucide-react";

export default function ServicesMurals() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    wallSize: "",
    wallCondition: "",
    theme: "",
    inspiration: "",
    timeline: "",
    budget: "",
    additionalNotes: "",
  });

  const submitMuralRequest = trpc.muralRequests.submit.useMutation({
    onSuccess: () => {
      toast.success("Mural request submitted! We'll be in touch soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        wallSize: "",
        wallCondition: "",
        theme: "",
        inspiration: "",
        timeline: "",
        budget: "",
        additionalNotes: "",
      });
    },
    onError: () => {
      toast.error("Failed to submit request. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMuralRequest.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <GlitchTitle as="h1" className="text-4xl md:text-5xl font-bold mb-6">
            Mural Commissions
          </GlitchTitle>
          <p className="text-xl text-gray-700 mb-4">
            Transform spaces with custom street art and large-scale murals.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            For businesses, councils, community spaces, homes, and studios across Brisbane.
          </p>
        </div>
      </section>

      {/* Pricing Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Pricing Guide</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <DollarSign className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Small Projects</h3>
              <p className="text-2xl font-bold text-blue-600 mb-3">From $500</p>
              <p className="text-gray-600 text-sm">
                Indoor walls, residential features, small commercial spaces (up to 2m x 2m)
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <DollarSign className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Medium Projects</h3>
              <p className="text-2xl font-bold text-purple-600 mb-3">$1,500 - $5,000</p>
              <p className="text-gray-600 text-sm">
                Large interior walls, storefronts, community spaces (2m x 4m to 5m x 5m)
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <DollarSign className="w-8 h-8 text-pink-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Large Projects</h3>
              <p className="text-2xl font-bold text-pink-600 mb-3">$5,000+</p>
              <p className="text-gray-600 text-sm">
                Building exteriors, large-scale public art, multi-wall projects (5m x 5m+)
              </p>
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm">
            All projects include consultation, concept development, sketches, and professional execution.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Initial Brief</h3>
                <p className="text-gray-600">
                  Fill out the form below with your project details. We'll discuss your vision, space, timeline, and budget.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Concept Development</h3>
                <p className="text-gray-600">
                  Based on your brief, I'll create concept sketches and design options for your approval.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Execution</h3>
                <p className="text-gray-600">
                  Once approved, I'll schedule the mural painting and complete the project to professional standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Request a Mural Quote</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your name"
                  title="Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your email"
                  title="Email"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your phone number"
                  title="Phone"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Location/Suburb</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your location or suburb"
                  title="Location/Suburb"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Wall Size (approx.)</label>
                <input
                  type="text"
                  placeholder="e.g. 4m x 3m"
                  value={formData.wallSize}
                  onChange={(e) => setFormData({ ...formData, wallSize: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  title="Wall Size"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Wall Condition</label>
                <select
                  value={formData.wallCondition}
                  onChange={(e) => setFormData({ ...formData, wallCondition: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  title="Wall Condition"
                >
                  <option value="">Select...</option>
                  <option value="new">New/Smooth</option>
                  <option value="good">Good condition</option>
                  <option value="needs-prep">Needs preparation</option>
                  <option value="rough">Rough/textured</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Theme/Style Ideas</label>
              <textarea
                rows={3}
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                placeholder="Describe your vision, preferred colors, style preferences..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Inspiration/References</label>
              <textarea
                rows={2}
                value={formData.inspiration}
                onChange={(e) => setFormData({ ...formData, inspiration: e.target.value })}
                placeholder="Links to images, artists, or styles you like..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  title="Timeline"
                >
                  <option value="">Select...</option>
                  <option value="urgent">Urgent (1-2 weeks)</option>
                  <option value="soon">Soon (2-4 weeks)</option>
                  <option value="flexible">Flexible (1-3 months)</option>
                  <option value="planning">Just planning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  title="Budget Range"
                >
                  <option value="">Select...</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-3000">$1,000 - $3,000</option>
                  <option value="3000-5000">$3,000 - $5,000</option>
                  <option value="5000-plus">$5,000+</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Additional Notes</label>
              <textarea
                rows={4}
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Any other details, questions, or requirements..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={submitMuralRequest.isPending}
            >
              {submitMuralRequest.isPending ? "Submitting..." : "Request Mural"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

