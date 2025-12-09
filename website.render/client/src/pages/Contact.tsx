import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Mail, Instagram, Facebook } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "workshop",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendContactMutation = trpc.email.sendContact.useMutation();

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
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await sendContactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        interest: "workshop",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (error: any) {
      setError(error?.message || "Failed to send message. Please try again.");
      console.error("Failed to send contact form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <GlitchTitle as="h1" className="text-4xl md:text-5xl font-bold mb-4">Contact</GlitchTitle>
          <p className="text-lg text-gray-600">
            Got a project, question, or idea? Reach out. I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email
                  </h3>
                  <a 
                    href="mailto:contact.scalebreakers@gmail.com"
                    className="text-blue-600 hover:underline break-all"
                  >
                    contact.scalebreakers@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">Follow Us</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://instagram.com/scale.breakers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition"
                      title="Instagram"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a 
                      href="https://www.facebook.com/TheScaleBreakers/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition"
                      title="Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Response Time</h3>
                  <p className="text-gray-600 text-sm">
                    I typically respond to enquiries within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Send a Message</h2>

              {submitted && (
                <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-1">Thank you!</h3>
                    <p className="text-green-800 text-sm">
                      Your message has been received. I'll be in touch soon.
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">What are you interested in? *</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    <option value="workshop">Workshops</option>
                    <option value="mural">Mural Commission</option>
                    <option value="3d">3D Services</option>
                    <option value="ndis">NDIS Programs</option>
                    <option value="council">Council / School Programs</option>
                    <option value="products">Products</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
