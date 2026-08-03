import { cn } from "@/utils/cn";

const VARIANTS = {
  primary: cn(
    "bg-brand-700 text-white",
    "hover:bg-brand-800",
    "active:scale-[0.98]",
    "shadow-sm hover:shadow-md"
  ),

  secondary: cn(
    "bg-surface-100 text-ink-950",
    "hover:bg-white",
    "border border-surface-200",
    "shadow-sm hover:shadow-md"
  ),

  outline: cn(
    "bg-white text-ink-950",
    "border border-surface-200",
    "hover:bg-surface-50",
    "hover:border-brand-100"
  ),
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        // Layout
        "inline-flex items-center justify-center gap-2",

        // Size
        "min-h-11 px-5 py-2.5",

        // Typography
        "text-sm font-medium",

        // Shape
        "rounded-xl",

        // Animation
        "transition-all duration-200 ease-out",

        // Focus
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-brand-600",
        "focus-visible:ring-offset-2",

        // Disabled
        "disabled:pointer-events-none",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",

        // Prevent text selection
        "select-none",

        VARIANTS[variant],

        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}