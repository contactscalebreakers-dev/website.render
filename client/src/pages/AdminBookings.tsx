import { useLocation } from "wouter";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash2, CheckCircle, Clock, XCircle, ArrowLeft } from "lucide-react";

export default function AdminBookings() {
  const [, setLocation] = useLocation();
  if (loading) return null;
  const { loading } = useAdminGuard();
const [selectedStatus, setSelectedStatus] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  // Check authentication
  const { data: bookings, isLoading, refetch } = trpc.admin.bookings.list.useQuery();
  const updateStatusMutation = trpc.admin.bookings.updateStatus.useMutation();
  const deleteMutation = trpc.admin.bookings.delete.useMutation();

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  const filteredBookings = bookings?.filter(booking => {
    if (selectedStatus === "all") return true;
    return booking.status === selectedStatus;
  }) || [];

  const handleStatusChange = async (id: string, newStatus: "pending" | "confirmed" | "cancelled") => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: newStatus });
      refetch();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteMutation.mutateAsync({ id });
        refetch();
      } catch (error) {
        console.error("Failed to delete booking:", error);
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => setLocation("/admin/dashboard")} className="mb-4 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-black mb-2">Workshop Bookings</h1>
          <p className="text-gray-600">Manage all workshop bookings and registrations</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {["all", "pending", "confirmed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as any)}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                selectedStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-600"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === "all" && ` (${bookings?.length || 0})`}
              {status !== "all" && ` (${bookings?.filter(b => b.status === status).length || 0})`}
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg border-2 border-gray-200 p-8 text-center">
            <p className="text-gray-600">No bookings found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Workshop</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Total Price</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, idx) => (
                    <tr key={booking.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{booking.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{booking.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.workshopId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{booking.quantity}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">${booking.totalPrice}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(booking.status || "")}
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status || "")}`}>
                            {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <select
                            aria-label="Change booking status"
                            value={booking.status || "pending"}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value as any)}
                            className="px-2 py-1 text-xs border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: bookings?.length || 0, color: "blue" },
            { label: "Pending", value: bookings?.filter(b => b.status === "pending").length || 0, color: "yellow" },
            { label: "Confirmed", value: bookings?.filter(b => b.status === "confirmed").length || 0, color: "green" },
            { label: "Cancelled", value: bookings?.filter(b => b.status === "cancelled").length || 0, color: "red" },
          ].map((stat, idx) => (
            <div key={idx} className={`bg-${stat.color}-50 border-2 border-${stat.color}-200 rounded-lg p-6`}>
              <p className={`text-sm font-bold text-${stat.color}-900 mb-2`}>{stat.label}</p>
              <p className={`text-3xl font-black text-${stat.color}-600`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
