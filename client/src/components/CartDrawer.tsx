import { X, Plus, Minus, ShoppingBag, Trash2, Lock, CreditCard } from "lucide-react";
import { useCart, CartItem } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Create checkout for multiple items
  const checkoutMutation = trpc.payments.createCartCheckout.useMutation({
    onSuccess: (data: { url?: string }) => {
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    },
    onError: (error: { message?: string }) => {
      toast({
        title: "Checkout Failed",
        description: error.message || "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
      setIsCheckingOut(false);
    },
  });

  // Fallback: checkout single items one by one
  const singleCheckoutMutation = trpc.payments.createProductCheckout.useMutation({
    onSuccess: (data: { url?: string }) => {
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    },
    onError: (error: { message?: string }) => {
      toast({
        title: "Checkout Failed",
        description: error.message || "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
      setIsCheckingOut(false);
    },
  });

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);

    // Try cart checkout first, fallback to single item
    try {
      if (items.length === 1) {
        singleCheckoutMutation.mutate({
          productId: items[0].id,
          quantity: items[0].quantity,
        });
      } else {
        // For multiple items, try cart checkout
        checkoutMutation.mutate({
          items: items.map((item: CartItem) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        });
      }
    } catch {
      setIsCheckingOut(false);
    }
  };

  // Focus trap and keyboard navigation
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform"
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" aria-hidden="true" />
            Your Cart
            {items.length > 0 && (
              <span className="bg-blue-600 text-white text-sm px-2 py-0.5 rounded-full">
                {items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
              </span>
            )}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </header>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" aria-hidden="true" />
              <p className="text-gray-600 text-lg font-medium">Your cart is empty</p>
              <p className="text-gray-500 text-sm mt-2">Add some awesome products!</p>
              <Button
                onClick={closeCart}
                className="mt-6 min-h-[44px]"
                variant="outline"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4" role="list" aria-label="Cart items">
              {items.map((item: CartItem) => (
                <li
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  {/* Product Image */}
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={`${item.name} product image`}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-8 h-8 text-gray-400" aria-hidden="true" />
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center font-medium" aria-label={`Quantity: ${item.quantity}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                        disabled={item.maxStock ? item.quantity >= item.maxStock : false}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer - Checkout */}
        {items.length > 0 && (
          <footer className="border-t border-gray-200 p-4 space-y-4 bg-white">
            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)} AUD</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)} AUD</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut || checkoutMutation.isPending || singleCheckoutMutation.isPending}
              className="w-full min-h-[52px] text-lg font-bold bg-green-600 hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              {isCheckingOut ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-5 h-5" aria-hidden="true" />
                  Secure Checkout
                </span>
              )}
            </Button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" aria-hidden="true" />
                Stripe Secure
              </span>
              <span>•</span>
              <span>AU Cards & Apple Pay</span>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}
