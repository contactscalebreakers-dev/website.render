import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import { Loader, Plus, ArrowLeft } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";
import ProductCard from "@/components/admin/ProductCard";
import ProductForm, { ProductFormData } from "@/components/admin/ProductForm";
import Toast from "@/components/admin/Toast";

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error" | "warning";
}

export default function AdminProducts() {
  const [, setLocation] = useLocation();
  if (loading) return null;
  const { loading } = useAdminGuard();
const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [toast, setToast] = useState<ToastState>({ show: false, message: "", type: "success" });

  const { data: products, isLoading } = trpc.products.list.useQuery();
  const createMutation = trpc.products.create.useMutation();
  const updateMutation = trpc.products.update.useMutation();
  const deleteMutation = trpc.products.delete.useMutation();
  const utils = trpc.useUtils();

  // Check authentication
  useEffect(() => {
    const password = sessionStorage.getItem("adminPassword");
    if (!password) {
      setLocation("/admin/login");
