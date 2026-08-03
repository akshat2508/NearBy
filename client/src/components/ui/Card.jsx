import { cn } from "@/utils/cn";

export default function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-surface-200 bg-surface-0 p-6 shadow-soft",
        "transition-shadow duration-150",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
