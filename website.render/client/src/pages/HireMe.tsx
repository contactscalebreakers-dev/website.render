import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader, CheckCircle, AlertCircle } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";

export default function HireMe() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "mural",
    projectDescription: "",
    budget: "",
    timeline: "",
    additionalNotes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const sendServiceEnquiryMutation = trpc.email.sendServiceEnquiry.useMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const detailsText = `
Service Type: ${formData.serviceType}
Project Description: ${formData.projectDescription}
Budget: ${formData.budget || "Not specified"}
Timeline: ${formData.timeline || "Not specified"}
Additional Notes: ${formData.additionalNotes || "None"}
      `.trim();

      await sendServiceEnquiryMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        service: formData.serviceType,
        details: detailsText,
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "mural",
        projectDescription: "",
        budget: "",
        timeline: "",
        additionalNotes: "",
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (error: any) {
      setError(error?.message || "Failed to submit project request. Please try again.");
      console.error("Failed to submit project request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <GlitchTitle as="h1" className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Hire Me for Murals, 3D and Urban Visuals
          </GlitchTitle>
          <p className="text-lg md:text-xl text-gray-300">
            Mural commissions, 3D character and toy work, scanning and digital projects for brands, businesses, and creators.
          </p>
        </div>
      </section>

      {/* Murals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Mural Commissions</h2>
              <p className="text-gray-600 mb-4">
                Transform walls into stunning artworks. I create custom murals for businesses, councils, community spaces, homes, and studios.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <div>
                    <h4 className="font-bold">Businesses & Storefronts</h4>
                    <p className="text-gray-600 text-sm">Boost curb appeal and brand identity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <div>
                    <h4 className="font-bold">Councils & Community Spaces</h4>
                    <p className="text-gray-600 text-sm">Public art and community engagement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <div>
                    <h4 className="font-bold">Homes & Studios</h4>
                    <p className="text-gray-600 text-sm">Personal creative spaces and galleries</p>
                  </div>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-4">How It Works</h4>
              <ol className="space-y-2 text-gray-600 text-sm">
                <li><strong>1. Brief:</strong> Discuss your vision, location, and goals</li>
                <li><strong>2. Concept:</strong> I develop initial design concepts</li>
                <li><strong>3. Sketch:</strong> Detailed sketches for your approval</li>
                <li><strong>4. Final:</strong> Professional mural execution</li>
              </ol>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">[Mural portfolio images will go here]</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3D & Digital Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">[3D portfolio images will go here]</p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">3D & Digital Services</h2>
              <p className="text-gray-600 mb-4">
                Professional 3D services for brands, creators, and agencies. From scanning to sculpting to character design.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold mt-1">→</span>
                  <div>
                    <h4 className="font-bold">3D Scanning</h4>
                    <p className="text-gray-600 text-sm">Capture real-world objects and environments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold mt-1">→</span>
                  <div>
                    <h4 className="font-bold">3D Sculpting & Modelling</h4>
                    <p className="text-gray-600 text-sm">Custom digital and physical models</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold mt-1">→</span>
                  <div>
                    <h4 className="font-bold">Character Design</h4>
                    <p className="text-gray-600 text-sm">Unique characters for games, animation, and products</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold mt-1">→</span>
                  <div>
                    <h4 className="font-bold">Animation & AR/VR</h4>
                    <p className="text-gray-600 text-sm">Interactive and immersive experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Portfolio Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Recent Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">Urban Mural Series</h3>
              <p className="text-gray-600 text-sm">
                Large-scale street art murals for Brisbane CBD featuring local culture and community themes.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">3D Character Toys</h3>
              <p className="text-gray-600 text-sm">
                Custom collectible figurines designed and produced for independent creators and brands.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">3D Scanning & Modelling</h3>
              <p className="text-gray-600 text-sm">
                High-fidelity 3D scans and digital models for product design, animation, and AR experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Enquiry Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Request a Project Quote</h2>
          
          {submitted && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-900 mb-1">Thank you!</h3>
                <p className="text-green-800 text-sm">
                  Your project enquiry has been received. I'll be in touch within 2-3 business days.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 mb-1">Error</h3>
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                title="Name"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                title="Email"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                title="Phone"
                placeholder="Enter your phone number (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Service Type *</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                title="Service Type"
                aria-label="Service Type"
              >
                <option value="mural">Mural Commission</option>
                <option value="3d-scanning">3D Scanning</option>
                <option value="3d-sculpting">3D Sculpting & Modelling</option>
                <option value="character-design">Character Design</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Project Description *</label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                title="Project Description"
                placeholder="Describe your project"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Budget (optional)</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. $2000 - $5000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                title="Budget"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Timeline (optional)</label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="e.g. 4-6 weeks"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                title="Timeline"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                title="Additional Notes"
                placeholder="Any extra information (optional)"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={sendServiceEnquiryMutation.isPending}
            >
              {sendServiceEnquiryMutation.isPending ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Send Project Enquiry"
              )}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
