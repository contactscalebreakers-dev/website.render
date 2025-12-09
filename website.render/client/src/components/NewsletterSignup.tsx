import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Mail, CheckCircle, AlertCircle, Loader } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";

interface NewsletterSignupProps {
  variant?: "default" | "compact" | "full";
  title?: string;
  description?: string;
}

export default function NewsletterSignup({
  variant = "default",
  title = "Stay Updated",
  description = "Subscribe to our newsletter for updates on new workshops, artworks, and exclusive offers.",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const newsletterMutation = trpc.newsletter.subscribe.useMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    try {
      await newsletterMutation.mutateAsync({ email, name: name || undefined });
      setSubscribed(true);
      setEmail("");
      setName("");
      setTimeout(() => setSubscribed(false), 5000);
    } catch (error: any) {
      if (error?.message?.includes("already subscribed")) {
        setError("This email is already subscribed");
      } else {
        setError("Failed to subscribe. Please try again.");
      }
      console.error("Failed to subscribe:", error);
    }
  };

  if (variant === "compact") {
    return (
      <div className="bg-black text-white py-8 px-4 rounded-lg">
        <div className="max-w-md">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300 text-sm mb-4">{description}</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="your@email.com"
              className="flex-1 px-3 py-2 bg-white text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={newsletterMutation.isPending}
            />
            <Button
              type="submit"
              size="sm"
              disabled={newsletterMutation.isPending}
              className="whitespace-nowrap"
            >
              {newsletterMutation.isPending ? <Loader className="w-4 h-4 animate-spin" /> : "Subscribe"}
            </Button>
          </form>
          {subscribed && (
            <p className="text-green-400 text-sm mt-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Thanks for subscribing!
            </p>
          )}
          {error && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <GlitchTitle className="text-4xl font-bold mb-4 text-white">{title}</GlitchTitle>
            <p className="text-lg text-gray-300">{description}</p>
          </div>

          {subscribed ? (
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">Welcome to Scale Breakers!</h3>
              <p className="text-green-800">
                Thanks for subscribing! Check your email for a welcome message. 
                We'll keep you updated on new workshops, artwork releases, and exclusive offers.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              {error && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-300"
                  required
                  disabled={newsletterMutation.isPending}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Name (Optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-300"
                  disabled={newsletterMutation.isPending}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe to Updates
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-300 text-center">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <GlitchTitle className="text-3xl font-bold mb-4 text-white">{title}</GlitchTitle>
          <p className="text-gray-300">{description}</p>
        </div>

        {subscribed ? (
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="text-green-900 font-semibold">
              Thanks for subscribing! Check your email for updates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-4">
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-300"
                required
                disabled={newsletterMutation.isPending}
              />
              <Button
                type="submit"
                size="lg"
                disabled={newsletterMutation.isPending}
                className="whitespace-nowrap"
              >
                {newsletterMutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-400 text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

