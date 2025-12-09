import { ReactNode } from "react";

interface GlitchTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function GlitchTitle({
  children,
  className = "",
  as: Component = "h2",
}: GlitchTitleProps) {
  const text = typeof children === "string" ? children : "";

  return (
    <Component
      className={`glitch-static ${className}`}
      data-text={text}
    >
      {children}
    </Component>
  );
}

