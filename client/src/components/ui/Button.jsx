import { cn } from "@/utils/cn";

const VARIANTS = {
  primary: "bg-ink-950 text-white hover:bg-ink-800",
  secondary: "bg-surface-100 text-ink-950 hover:bg-surface-200",
  outline: "border border-surface-200 text-ink-950 hover:bg-surface-50",
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
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
