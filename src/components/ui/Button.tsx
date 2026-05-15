"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "outline" | "solid" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  outline:
    "border border-saturn-gold text-saturn-cream hover:shadow-[0_0_24px_rgba(212,165,116,0.45)] hover:border-saturn-cream",
  solid:
    "bg-saturn-gold text-space-black hover:bg-saturn-cream",
  ghost:
    "text-saturn-cream/80 hover:text-saturn-cream hover:bg-white/5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] transition-all duration-300 ease-out backdrop-blur-sm",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
