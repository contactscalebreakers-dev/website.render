import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface WorkshopBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshopTitle: string;
  workshopPrice: number;
}

export default function WorkshopBookingModal({
  isOpen,
  onClose,
  workshopTitle,
  workshopPrice,
}: WorkshopBookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "1",
    date: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const bookingMutation = trpc.workshops.bookWorkshop.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", quantity: "1", date: "" });
      }, 3000);
    },
    onError: (error) => {
      setError(error.message || "Failed to complete booking. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      setError("Please fill in all required fields");
      return;
    }

    const totalPrice = workshopPrice * parseInt(formData.quantity);

    bookingMutation.mutate({
      workshopTitle,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      quantity: parseInt(formData.quantity),
      date: formData.date,
      totalPrice,
    });
  };

  const totalPrice = workshopPrice * parseInt(formData.quantity);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Workshop: {workshopTitle}</DialogTitle>
          <DialogDescription>
            Fill in your details to secure your spot. You'll receive a confirmation email.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Booking Confirmed!</h3>
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
            <p className="text-xs text-gray-500 mt-4">This modal will close automatically...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <Input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email Address *</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number *</label>
              <Input
                type="tel"
                placeholder="(02) 1234 5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Preferred Date *</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Number of Tickets *</label>
              <Select value={formData.quantity} onValueChange={(value) => setFormData({ ...formData, quantity: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Ticket - ${workshopPrice}</SelectItem>
                  <SelectItem value="2">2 Tickets - $30 (Pair Discount)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Subtotal:</span>
                <span className="text-sm">${(workshopPrice * parseInt(formData.quantity)).toFixed(2)}</span>
              </div>
              {parseInt(formData.quantity) === 2 && (
                <div className="flex justify-between items-center text-green-600 text-sm mb-2">
                  <span>Pair Discount:</span>
                  <span>-${(workshopPrice * 2 - 30).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={bookingMutation.isPending}
                className="flex-1"
              >
                {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
