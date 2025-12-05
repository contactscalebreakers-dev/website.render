import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, ShoppingCart } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface WorkshopBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshopId: string;
  workshopTitle: string;
  workshopPrice: number;
}

export default function WorkshopBookingModal({
  isOpen,
  onClose,
  workshopId,
  workshopTitle,
  workshopPrice,
}: WorkshopBookingModalProps) {
  const [quantity, setQuantity] = useState("1");
  const [error, setError] = useState("");

  const checkoutMutation = trpc.payments.createWorkshopCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      setError(error.message || "Failed to start checkout. Please try again.");
    },
  });

  const handleCheckout = () => {
    setError("");
    
    const quantityNum = parseInt(quantity);
    const totalPrice = quantityNum === 2 ? 30 : workshopPrice * quantityNum;

    checkoutMutation.mutate({
      workshopId,
      quantity: quantityNum,
      totalPrice,
    });
  };

  const totalPrice = parseInt(quantity) === 2 ? 30 : workshopPrice * parseInt(quantity);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book: {workshopTitle}</DialogTitle>
          <DialogDescription>
            Select your tickets and proceed to secure payment via Stripe.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Number of Tickets</label>
            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Ticket - ${workshopPrice}</SelectItem>
                <SelectItem value="2">2 Tickets - $30 (Pair Discount!)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Subtotal:</span>
              <span className="text-sm">${(workshopPrice * parseInt(quantity)).toFixed(2)}</span>
            </div>
            {parseInt(quantity) === 2 && (
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              <strong>Secure Payment:</strong> You'll be redirected to Stripe to complete your booking with credit/debit card.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleCheckout}
              disabled={checkoutMutation.isPending}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {checkoutMutation.isPending ? "Processing..." : "Pay with Stripe"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
