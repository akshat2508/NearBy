import { cn } from "@/utils/cn";

export default function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        // Layout
        "relative overflow-hidden",

        // Appearance
        "rounded-2xl bg-surface-0",
        "border border-surface-200",

        // Spacing
        "p-6",

        // Elevation
        "shadow-sm",

        // Interaction
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5",
        "hover:shadow-md",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}