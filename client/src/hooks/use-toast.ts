import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: (props: { title?: string; description?: string; variant?: "default" | "destructive" }) => {
      if (props.variant === "destructive") {
        sonnerToast.error(props.title, { description: props.description });
      } else {
        sonnerToast.success(props.title, { description: props.description });
      }
    },
    dismiss: sonnerToast.dismiss,
  };
}

export const toast = sonnerToast;
