import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import { Loader, Plus, Edit2, Trash2, ArrowLeft, Calendar } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";

interface WorkshopForm {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  capacity: string;
  imageUrl: string;
}

export default function AdminWorkshops() {
  const [, setLocation] = useLocation();
  if (loading) return null;
  const { loading } = useAdminGuard();
const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<WorkshopForm>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "Scale Breakers Studio",
    price: "15",
    capacity: "23",
    imageUrl: "",
  });

  const { data: workshops, isLoading, refetch } = trpc.workshops.list.useQuery();
  const createMutation = trpc.workshops.create.useMutation();
  const updateMutation = trpc.workshops.update.useMutation();
  const deleteMutation = trpc.workshops.delete.useMutation();

  if (!isAuthenticated) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
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
      console.error("Error saving workshop:", error);
      alert("Failed to save workshop. Check console for details.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this workshop?")) {
      await deleteMutation.mutateAsync({ id });
      refetch();
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      description: item.description,
      date: new Date(item.date).toISOString().split('T')[0],
      time: item.time,
      location: item.location,
      price: item.price.toString(),
      capacity: item.capacity.toString(),
      imageUrl: item.imageUrl || "",
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "Scale Breakers Studio",
      price: "15",
      capacity: "23",
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
          <GlitchTitle className="text-4xl font-bold">Manage Workshops</GlitchTitle>
        </div>

        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="mb-8 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Workshop
          </Button>
        )}

        {showForm && (
          <div className="bg-gray-50 p-8 rounded-lg mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit Workshop" : "Add New Workshop"}</h2>
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
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Capacity</label>
                  <input
                    type="number"
                    required
                    value={formData.capacity}
                    onChange={e => setFormData({...formData, capacity: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="/workshop-image.jpg"
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
                  {editingId ? "Update Workshop" : "Create Workshop"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Time</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Registered</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops?.map((workshop: any) => (
                <tr key={workshop.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{new Date(workshop.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">{workshop.title}</td>
                  <td className="px-6 py-4">{workshop.time}</td>
                  <td className="px-6 py-4">${workshop.price}</td>
                  <td className="px-6 py-4">{workshop.currentAttendees || 0} / {workshop.capacity}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEdit(workshop)} className="p-2 hover:bg-gray-200 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(workshop.id)} className="p-2 hover:bg-red-100 text-red-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!workshops || workshops.length === 0) && (
            <div className="p-8 text-center text-gray-500">No workshops found. Create one!</div>
          )}
        </div>
      </div>
    </div>
  );
}
