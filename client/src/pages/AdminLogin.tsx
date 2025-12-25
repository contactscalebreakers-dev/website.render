import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import GlitchTitle from "@/components/GlitchTitle";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string>("");

  const provider = (import.meta.env.VITE_ADMIN_OAUTH_PROVIDER as string | undefined) || "google";

  async function signIn() {
    setError("");

    const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
    if (!url || !anon) {
      setError("Supabase env vars are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY on Render.");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: `${window.location.origin}/admin/dashboard`,
      },
    });

    if (error) setError(error.message);
  }

  async function goHome() {
    setLocation("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <GlitchTitle as="h1" className="text-3xl font-bold mb-6 text-center">
          Admin Login
        </GlitchTitle>

        <div className="space-y-4">
          {error ? <p className="text-red-600 text-sm">{error}</p> : null}

          <Button onClick={signIn} className="w-full">
            Sign in with {provider}
          </Button>

          <Button variant="outline" onClick={goHome} className="w-full">
            Back to site
          </Button>

          <p className="text-xs text-muted-foreground text-center pt-2">
            If you can log in but still get redirected back here, check your Supabase Redirect URLs.
          </p>
        </div>
      </div>
    </div>
  );
}
