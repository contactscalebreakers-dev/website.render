import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import GlitchTitle from "@/components/GlitchTitle";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store password in sessionStorage (simple approach)
    if (password) {
      sessionStorage.setItem("adminPassword", password);
      setLocation("/admin/dashboard");
    } else {
      setError("Please enter a password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <GlitchTitle as="h1" className="text-3xl font-bold mb-6 text-center">
          Admin Login
        </GlitchTitle>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin password"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Login
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Set ADMIN_PASSWORD in your .env file
        </p>
      </div>
    </div>
  );
}
