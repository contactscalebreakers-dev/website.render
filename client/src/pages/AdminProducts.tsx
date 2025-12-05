import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import { Loader, Plus, Edit2, Trash2, X } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";

interface ProductForm {
  name: string;
  description: string;
  category: "workshop-ticket" | "3d-model" | "diorama" | "canvas" | "mural";
  price: string;
  stock: string;
  imageUrl: string;
  isOneOfOne: boolean;
}

export default function AdminProducts() {
  const { user, loading: authLoading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    category: "3d-model",
    price: "",
    stock: "",
    imageUrl: "",
    isOneOfOne: false,
  });

  const { data: products, isLoading } = trpc.products.list.useQuery();
  const createMutation = trpc.products.create.useMutation();
  const updateMutation = trpc.products.update.useMutation();
  const deleteMutation = trpc.products.delete.useMutation();
  const utils = trpc.useUtils();

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen"><Loader className="animate-spin" /></div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        });
      } else {
        await createMutation.mutateAsync({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        });
      }
      utils.products.list.invalidate();
      setFormData({
        name: "",
        description: "",
        category: "3d-model",
        price: "",
        stock: "",
        imageUrl: "",
        isOneOfOne: false,
      });
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteMutation.mutateAsync({ id });
        utils.products.list.invalidate();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEdit = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl || "",
      isOneOfOne: product.isOneOfOne === "true" || product.isOneOfOne === true,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <GlitchTitle className="text-4xl font-bold">Product Management</GlitchTitle>
          <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {showForm ? "Cancel" : "Add Product"}
          </Button>
        </div>

        {/* Product Form */}
        {showForm && (
          <div className="bg-gray-50 p-8 rounded-lg mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="workshop-ticket">Workshop Ticket</option>
                    <option value="3d-model">3D Model</option>
                    <option value="diorama">Diorama</option>
                    <option value="canvas">Canvas</option>
                    <option value="mural">Mural Production</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/portfolio-image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isOneOfOne}
                      onChange={(e) => setFormData({ ...formData, isOneOfOne: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">One-of-One Piece</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {createMutation.isPending || updateMutation.isPending ? (
                    <Loader className="animate-spin mr-2 w-4 h-4" />
                  ) : null}
                  {editingId ? "Update Product" : "Create Product"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      name: "",
                      description: "",
                      category: "3d-model",
                      price: "",
                      stock: "",
                      imageUrl: "",
                      isOneOfOne: false,
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <Loader className="animate-spin mx-auto" />
            </div>
          ) : products && products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any) => (
                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{product.name}</td>
                      <td className="px-6 py-4 text-sm capitalize">{product.category.replace("-", " ")}</td>
                      <td className="px-6 py-4 text-sm">${parseFloat(product.price).toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">{product.stock}</td>
                      <td className="px-6 py-4 text-sm">
                        {product.isOneOfOne === "true" || product.isOneOfOne === true ? (
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                            One-of-One
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            Multiple
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-gray-200 rounded transition"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No products yet. Create your first product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

