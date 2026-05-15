import { cn } from "@/lib/utils";

interface HUDPanelProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Mission-control HUD chip. Used as a decorative frame around
 * status text in the hero corners — corner ticks evoke the
 * targeting reticle aesthetic.
 */
export function HUDPanel({ label, children, className }: HUDPanelProps) {
  return (
    <div
      className={cn(
        "relative border border-saturn-gold/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-saturn-cream/70",
        className
      )}
    >
      {/* Corner ticks — pseudo-elements would be cleaner but inline lets us tune per-instance later. */}
      <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-saturn-gold" />
      <span className="pointer-events-none absolute -right-px -top-px h-2 w-2 border-r border-t border-saturn-gold" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b border-l border-saturn-gold" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-saturn-gold" />
      {label}
      {children}
    </div>
  );
}
