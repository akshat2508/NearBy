import { cn } from "@/utils/cn";

export default function Spinner({ className = "h-6 w-6" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-spin rounded-full",
        "border-2 border-surface-200",
        "border-t-brand-700",
        "shrink-0",
        className
      )}
    />
  );
}