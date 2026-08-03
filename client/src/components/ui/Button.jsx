import { cn } from "@/utils/cn";

const VARIANTS = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 disabled:bg-surface-200 disabled:text-ink-400",
  secondary:
    "bg-surface-0 text-ink-950 border border-surface-200 hover:border-ink-950/20 hover:bg-surface-50 disabled:text-ink-400",
  ghost:
    "bg-transparent text-ink-600 hover:bg-surface-100 hover:text-ink-950 disabled:text-ink-400",
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5",
        "text-sm font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
