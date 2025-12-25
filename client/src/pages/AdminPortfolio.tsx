import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import { Loader, Plus, Edit2, Trash2, ArrowLeft, Palette } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";

interface PortfolioForm {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

export default function AdminPortfolio() {
  const [, setLocation] = useLocation();
  if (loading) return null;
  const { loading } = useAdminGuard();
const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<PortfolioForm>({
    title: "",
    description: "",
    category: "murals",
    imageUrl: "",
  });

  const { data: items, isLoading, refetch } = trpc.portfolio.list.useQuery();
  const createMutation = trpc.portfolio.create.useMutation();
  const updateMutation = trpc.portfolio.update.useMutation();
  const deleteMutation = trpc.portfolio.delete.useMutation();

  if (!isAuthenticated) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        imageUrl: formData.imageUrl || undefined,
      };

      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...data });
      } else {
        await createMutation.mutateAsync(data);
      }
      
      refetch();
      resetForm();
    } catch (error) {
      console.error("Error saving portfolio item:", error);
      alert("Failed to save item.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteMutation.mutateAsync({ id });
      refetch();
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      imageUrl: item.imageUrl || "",
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "murals",
      imageUrl: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setLocation("/admin/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <GlitchTitle className="text-4xl font-bold">Manage Portfolio</GlitchTitle>
        </div>

        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="mb-8 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Portfolio Item
          </Button>
        )}

        {showForm && (
          <div className="bg-gray-50 p-8 rounded-lg mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit Item" : "Add New Item"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="murals">Murals</option>
                    <option value="3d-models">3D Models</option>
                    <option value="dioramas">Dioramas</option>
                    <option value="workshops">Workshops</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="/portfolio-image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border rounded h-32"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingId ? "Update Item" : "Create Item"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {items?.map((item: any) => (
            <div key={item.id} className="border rounded-lg overflow-hidden group relative">
              <div className="aspect-video bg-gray-100 relative">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button variant="secondary" size="sm" onClick={() => handleEdit(item)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{item.category}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
