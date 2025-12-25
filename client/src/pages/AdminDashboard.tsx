import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import Header from "@/components/Header";
import GlitchTitle from "@/components/GlitchTitle";
import { ShoppingBag, Calendar, Palette, ClipboardList, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  if (loading) return null;
  const { loading } = useAdminGuard();
const handleLogout = async () => {
    await supabase.auth.signOut();
    setLocation("/admin/login");
  };

  if (!isAuthenticated) return null;

  const cards = [
    {
      title: "Products",
      description: "Manage shop items, inventory, and pricing",
      icon: ShoppingBag,
      href: "/admin/products",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Workshops",
      description: "Schedule classes, set capacity, and details",
      icon: Calendar,
      href: "/admin/workshops",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Portfolio",
      description: "Update gallery images and categories",
      icon: Palette,
      href: "/admin/portfolio",
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Bookings",
      description: "View and manage workshop registrations",
      icon: ClipboardList,
      href: "/admin/bookings",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <GlitchTitle className="text-4xl font-bold">Admin Dashboard</GlitchTitle>
          <Button variant="outline" onClick={handleLogout} className="flex gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              onClick={() => setLocation(card.href)}
              className="bg-white rounded-xl border-2 border-gray-200 p-8 cursor-pointer hover:border-black hover:shadow-lg transition-all group"
            >
              <div className={`w-16 h-16 rounded-2xl ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <card.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-600 text-lg">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
