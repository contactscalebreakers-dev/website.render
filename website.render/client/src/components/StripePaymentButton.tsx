import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StripePaymentButtonProps {
  onClick: () => Promise<{ url: string }>;
  label?: string;
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function StripePaymentButton({
  onClick,
  label = "Pay Now",
  disabled = false,
  variant = "default",
  size = "default",
}: StripePaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const { url } = await onClick();
      
      if (url) {
        toast.success("Redirecting to checkout...");
        window.open(url, "_blank");
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      variant={variant}
      size={size}
      className="gap-2"
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {label}
    </Button>
  );
}
